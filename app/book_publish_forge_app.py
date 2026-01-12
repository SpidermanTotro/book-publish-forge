import os
import tkinter as tk
from dataclasses import dataclass
from datetime import datetime
from tkinter import filedialog, messagebox, ttk
from urllib import request
from urllib.error import URLError

DEFAULT_OLLAMA_URL = os.environ.get("BOOK_PUBLISH_FORGE_OLLAMA_URL", "http://127.0.0.1:11434")
DEFAULT_IMAGE_URL = os.environ.get("BOOK_PUBLISH_FORGE_IMAGE_URL", "http://127.0.0.1:7860")


@dataclass
class AuditEntry:
    timestamp: str
    action: str
    details: str


class BookPublishForgeApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Book Publish Forge")
        self.geometry("1120x800")
        self.minsize(1024, 760)

        self.doc_text = tk.StringVar()
        self.mode = tk.StringVar(value="Unknown")
        self.converted_text = tk.StringVar()
        self.ethics_confirmed = tk.BooleanVar(value=False)
        self.ollama_status = tk.StringVar(value="Not checked")
        self.image_status = tk.StringVar(value="Not checked")
        self.ollama_url = tk.StringVar(value=DEFAULT_OLLAMA_URL)
        self.image_url = tk.StringVar(value=DEFAULT_IMAGE_URL)

        self.audit_entries: list[AuditEntry] = []

        self._configure_style()
        self._build_ui()

    def _configure_style(self):
        style = ttk.Style()
        style.theme_use("clam")
        style.configure("Header.TLabel", font=("Segoe UI", 20, "bold"), foreground="#faf5ff", background="#4c1d95")
        style.configure("Subheader.TLabel", font=("Segoe UI", 11), foreground="#e9d5ff", background="#4c1d95")
        style.configure("Section.TLabel", font=("Segoe UI", 12, "bold"), foreground="#111827")
        style.configure("Accent.TButton", font=("Segoe UI", 10, "bold"))
        style.configure("Sidebar.TFrame", background="#f5f3ff")
        style.configure("Sidebar.TLabel", background="#f5f3ff", foreground="#4c1d95", font=("Segoe UI", 11, "bold"))
        style.configure("Card.TLabelframe", background="#ffffff")
        style.configure("Card.TLabelframe.Label", font=("Segoe UI", 11, "bold"))

    def _build_ui(self):
        header = tk.Frame(self, bg="#4c1d95")
        header.pack(fill=tk.X)
        ttk.Label(header, text="Book Publish Forge", style="Header.TLabel").pack(padx=16, pady=(14, 0), anchor="w")
        ttk.Label(
            header,
            text="Linux desktop program for writing with local LLM + cover art tools.",
            style="Subheader.TLabel",
        ).pack(padx=16, pady=(0, 14), anchor="w")

        body = ttk.Frame(self)
        body.pack(fill=tk.BOTH, expand=True, padx=16, pady=16)

        sidebar = ttk.Frame(body, style="Sidebar.TFrame")
        sidebar.pack(side=tk.LEFT, fill=tk.Y)

        ttk.Label(sidebar, text="Studio Modules", style="Sidebar.TLabel").pack(padx=12, pady=(12, 8), anchor="w")
        for item in ["Writing Studio", "Integrations", "Audit Log", "Cover Preview"]:
            ttk.Label(sidebar, text=f"• {item}", background="#f5f3ff", foreground="#6b21a8").pack(
                padx=16, pady=4, anchor="w"
            )

        quick_actions = ttk.Labelframe(sidebar, text="Quick Actions", style="Card.TLabelframe")
        quick_actions.pack(padx=12, pady=12, fill=tk.X)
        ttk.Button(quick_actions, text="Detect Mode", style="Accent.TButton", command=self.detect_mode).pack(
            fill=tk.X, padx=8, pady=4
        )
        ttk.Button(quick_actions, text="Convert to Erotic", command=self.convert_to_erotic).pack(
            fill=tk.X, padx=8, pady=4
        )
        ttk.Button(quick_actions, text="Convert to Normal", command=self.convert_to_normal).pack(
            fill=tk.X, padx=8, pady=4
        )
        ttk.Button(quick_actions, text="Export", command=self.export_document).pack(fill=tk.X, padx=8, pady=4)

        notebook = ttk.Notebook(body)
        notebook.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(16, 0))

        self._build_writer_tab(notebook)
        self._build_integrations_tab(notebook)
        self._build_audit_tab(notebook)
        self._build_cover_tab(notebook)

    def _build_writer_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Writing Studio")

        text_frame = ttk.Frame(frame)
        text_frame.pack(fill=tk.BOTH, expand=True, padx=16, pady=16)

        ttk.Label(text_frame, text="Draft", style="Section.TLabel").pack(anchor="w")
        self.draft_box = tk.Text(text_frame, height=14, wrap=tk.WORD)
        self.draft_box.pack(fill=tk.BOTH, expand=True, pady=(6, 12))

        status_frame = ttk.Frame(text_frame)
        status_frame.pack(fill=tk.X, pady=(0, 8))
        ttk.Label(status_frame, text="Detected Mode:", style="Section.TLabel").pack(side=tk.LEFT)
        ttk.Label(status_frame, textvariable=self.mode, foreground="#7c3aed", font=("Segoe UI", 11, "bold")).pack(
            side=tk.LEFT, padx=8
        )

        ttk.Label(text_frame, text="Converted Output", style="Section.TLabel").pack(anchor="w", pady=(12, 0))
        self.convert_box = tk.Text(text_frame, height=9, wrap=tk.WORD)
        self.convert_box.pack(fill=tk.BOTH, expand=True, pady=(6, 12))

        ethics_frame = ttk.Frame(text_frame)
        ethics_frame.pack(fill=tk.X)
        ttk.Checkbutton(
            ethics_frame,
            text="I confirm consent/ethics review is complete",
            variable=self.ethics_confirmed,
        ).pack(side=tk.LEFT)
        ttk.Button(ethics_frame, text="Log Ethics Approval", command=self.log_ethics).pack(side=tk.RIGHT)

    def _build_integrations_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Integrations")

        info = ttk.Label(
            frame,
            text=(
                "Connect to local Ollama for writing and Stable Diffusion WebUI for cover art. "
                "These checks run locally and keep data on your machine."
            ),
            wraplength=760,
            justify=tk.LEFT,
        )
        info.pack(fill=tk.X, padx=16, pady=(16, 8))

        status_frame = ttk.LabelFrame(frame, text="Status", style="Card.TLabelframe")
        status_frame.pack(fill=tk.X, padx=16, pady=8)
        ttk.Label(status_frame, text="Ollama status:", style="Section.TLabel").grid(row=0, column=0, sticky="w", padx=8, pady=6)
        ttk.Label(status_frame, textvariable=self.ollama_status).grid(row=0, column=1, sticky="w")
        ttk.Label(status_frame, text="Image status:", style="Section.TLabel").grid(row=1, column=0, sticky="w", padx=8, pady=6)
        ttk.Label(status_frame, textvariable=self.image_status).grid(row=1, column=1, sticky="w")

        form = ttk.LabelFrame(frame, text="Endpoints", style="Card.TLabelframe")
        form.pack(fill=tk.X, padx=16, pady=12)

        ttk.Label(form, text="Ollama URL").grid(row=0, column=0, sticky="w", padx=8, pady=6)
        ttk.Entry(form, textvariable=self.ollama_url, width=50).grid(row=0, column=1, sticky="w")
        ttk.Button(form, text="Test", command=self.check_ollama).grid(row=0, column=2, padx=8)

        ttk.Label(form, text="Image URL").grid(row=1, column=0, sticky="w", padx=8, pady=6)
        ttk.Entry(form, textvariable=self.image_url, width=50).grid(row=1, column=1, sticky="w")
        ttk.Button(form, text="Test", command=self.check_image).grid(row=1, column=2, padx=8)

        examples = ttk.Label(
            frame,
            text="Suggested Ollama models: dolphin-mixtral, llama3, mistral. Use: ollama pull <model>",
            foreground="#6b7280",
        )
        examples.pack(fill=tk.X, padx=16, pady=(0, 16))

    def _build_audit_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Audit Log")

        ttk.Label(frame, text="Actions recorded in this session.", style="Section.TLabel").pack(anchor="w", padx=16, pady=12)
        self.audit_list = tk.Listbox(frame, height=18)
        self.audit_list.pack(fill=tk.BOTH, expand=True, padx=16, pady=(0, 16))

    def _build_cover_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Cover Preview")

        ttk.Label(frame, text="Cover Art Preview", style="Section.TLabel").pack(anchor="w", padx=16, pady=(16, 8))
        canvas = tk.Canvas(frame, width=360, height=480, bg="#f3f4f6", highlightthickness=1, highlightbackground="#d1d5db")
        canvas.pack(padx=16, pady=(0, 12), anchor="w")
        canvas.create_rectangle(20, 20, 340, 460, outline="#7c3aed", width=2)
        canvas.create_text(180, 200, text="Cover Preview", fill="#6b7280", font=("Segoe UI", 14, "bold"))
        canvas.create_text(180, 240, text="Connect your image generator\nand import a cover here.", fill="#9ca3af", font=("Segoe UI", 10))

        ttk.Label(
            frame,
            text="Tip: Generate cover art with your local Stable Diffusion WebUI and save it, then attach it here.",
            foreground="#6b7280",
            wraplength=760,
            justify=tk.LEFT,
        ).pack(fill=tk.X, padx=16, pady=(0, 16))

        ttk.Button(frame, text="Load Cover Image", command=self.load_cover_image).pack(padx=16, pady=(0, 16), anchor="w")

        self.cover_canvas = canvas

    def load_cover_image(self):
        filename = filedialog.askopenfilename(
            title="Select Cover Image",
            filetypes=[("Image files", "*.png;*.jpg;*.jpeg;*.gif;*.bmp"), ("All files", "*.*")],
        )
        if not filename:
            return
        try:
            image = tk.PhotoImage(file=filename)
        except tk.TclError:
            messagebox.showerror("Cover Image", "Unable to load image. Please use PNG/GIF or supported formats.")
            return
        self.cover_canvas.delete("all")
        self.cover_canvas.create_image(180, 240, image=image)
        self.cover_canvas.image = image
        self._add_audit("Cover Preview", f"Loaded cover image: {filename}.")

    def detect_mode(self):
        content = self.draft_box.get("1.0", tk.END).strip()
        if not content:
            messagebox.showinfo("Detect Mode", "Paste or type your draft first.")
            return
        lowered = content.lower()
        erotic_keywords = ["kiss", "touch", "desire", "naked", "passion", "intimate"]
        mode = "Erotic" if any(word in lowered for word in erotic_keywords) else "Normal"
        self.mode.set(mode)
        self._add_audit("Mode Detection", f"Classified document as {mode}.")

    def convert_to_erotic(self):
        self._convert_text("erotic")

    def convert_to_normal(self):
        self._convert_text("normal")

    def _convert_text(self, target):
        content = self.draft_box.get("1.0", tk.END).strip()
        if not content:
            messagebox.showinfo("Convert", "Paste or type your draft first.")
            return
        if target == "erotic":
            converted = content.replace("smile", "lingering smile").replace("hug", "slow embrace")
            action = "Converted to Erotic"
        else:
            converted = (
                content.replace("naked", "bare").replace("touch", "contact").replace("passion", "emotion")
            )
            action = "Converted to Normal"
        self.convert_box.delete("1.0", tk.END)
        self.convert_box.insert(tk.END, converted)
        self._add_audit("Conversion", action)

    def log_ethics(self):
        if not self.ethics_confirmed.get():
            messagebox.showwarning("Ethics", "Confirm the ethics checkbox before logging.")
            return
        self._add_audit("Ethics Review", "Consent and ethics review confirmed.")

    def export_document(self):
        content = self.convert_box.get("1.0", tk.END).strip() or self.draft_box.get("1.0", tk.END).strip()
        if not content:
            messagebox.showinfo("Export", "Nothing to export yet.")
            return
        filename = filedialog.asksaveasfilename(
            title="Export Document",
            defaultextension=".txt",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
        )
        if not filename:
            return
        with open(filename, "w", encoding="utf-8") as handle:
            handle.write(content)
        self._add_audit("Export", f"Exported document to {filename}.")

    def check_ollama(self):
        self.ollama_status.set(self._probe_url(self.ollama_url.get(), "/api/tags"))

    def check_image(self):
        self.image_status.set(self._probe_url(self.image_url.get(), "/sdapi/v1/options"))

    def _probe_url(self, base_url: str, path: str) -> str:
        url = f"{base_url}{path}"
        try:
            with request.urlopen(url, timeout=3) as response:
                if response.status == 200:
                    status = "Online"
                else:
                    status = f"HTTP {response.status}"
        except URLError:
            status = "Offline"
        self._add_audit("Integration Check", f"Checked {url}: {status}.")
        return status

    def _add_audit(self, action: str, details: str):
        entry = AuditEntry(
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            action=action,
            details=details,
        )
        self.audit_entries.append(entry)
        self.audit_list.insert(tk.END, f"{entry.timestamp} | {entry.action} | {entry.details}")


if __name__ == "__main__":
    app = BookPublishForgeApp()
    app.mainloop()

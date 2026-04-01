import json
import os
import threading
import time
import tkinter as tk
from dataclasses import dataclass, field
from datetime import datetime
from tkinter import filedialog, messagebox, simpledialog, ttk
from urllib import request
from urllib.error import URLError
from urllib.request import urlopen
from urllib.parse import urlencode
import urllib.request

DEFAULT_OLLAMA_URL = os.environ.get("BOOK_PUBLISH_FORGE_OLLAMA_URL", "http://127.0.0.1:11434")
DEFAULT_IMAGE_URL = os.environ.get("BOOK_PUBLISH_FORGE_IMAGE_URL", "http://127.0.0.1:7860")
DEFAULT_DAILY_GOAL = int(os.environ.get("BOOK_PUBLISH_FORGE_DAILY_GOAL", "500"))


@dataclass
class AuditEntry:
    timestamp: str
    action: str
    details: str


@dataclass
class Scene:
    id: str
    title: str
    text: str = ""


@dataclass
class Chapter:
    id: str
    title: str
    scenes: list = field(default_factory=list)


class BookPublishForgeApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Book Publish Forge")
        self.geometry("1280x820")
        self.minsize(1024, 760)

        self.mode = tk.StringVar(value="Unknown")
        self.converted_text = tk.StringVar()
        self.ethics_confirmed = tk.BooleanVar(value=False)
        self.ollama_status = tk.StringVar(value="Not checked")
        self.image_status = tk.StringVar(value="Not checked")
        self.ollama_url = tk.StringVar(value=DEFAULT_OLLAMA_URL)
        self.image_url = tk.StringVar(value=DEFAULT_IMAGE_URL)
        self.ollama_model = tk.StringVar(value="llama3")
        self.daily_goal = tk.IntVar(value=DEFAULT_DAILY_GOAL)

        # Project structure: list of Chapter objects
        self._project: list[Chapter] = [
            Chapter(id="ch1", title="Chapter 1", scenes=[Scene(id="s1", title="Opening Scene")])
        ]
        self._active_chapter_idx: int = 0
        self._active_scene_idx: int = 0

        # Session stats
        self._session_start = time.time()
        self._session_words_start = 0

        self.audit_entries: list[AuditEntry] = []

        # Focus mode state
        self._focus_mode = False
        self._sidebar_frame = None

        self._configure_style()
        self._build_ui()
        self._refresh_binder()
        self._start_stats_ticker()

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
        # ── Menu bar ─────────────────────────────────────────────────
        menubar = tk.Menu(self)
        file_menu = tk.Menu(menubar, tearoff=0)
        file_menu.add_command(label="New Project",        command=self._project_new,       accelerator="Ctrl+N")
        file_menu.add_command(label="Open Project…",      command=self._project_open,      accelerator="Ctrl+O")
        file_menu.add_command(label="Save Project",       command=self._project_save,      accelerator="Ctrl+S")
        file_menu.add_command(label="Save Project As…",   command=self._project_save_as)
        file_menu.add_separator()
        file_menu.add_command(label="Export Manuscript…", command=self.export_document)
        file_menu.add_separator()
        file_menu.add_command(label="Quit",               command=self.destroy,            accelerator="Ctrl+Q")
        menubar.add_cascade(label="File", menu=file_menu)
        self.config(menu=menubar)
        self.bind_all("<Control-n>", lambda _e: self._project_new())
        self.bind_all("<Control-o>", lambda _e: self._project_open())
        self.bind_all("<Control-s>", lambda _e: self._project_save())
        self.bind_all("<Control-q>", lambda _e: self.destroy())
        self._project_file: str | None = None

        # ── Header bar ──────────────────────────────────────────────
        header = tk.Frame(self, bg="#4c1d95")
        header.pack(fill=tk.X)
        ttk.Label(header, text="Book Publish Forge", style="Header.TLabel").pack(padx=16, pady=(14, 0), anchor="w")
        ttk.Label(
            header,
            text="Linux desktop app for writing with local LLM + cover art tools.",
            style="Subheader.TLabel",
        ).pack(padx=16, pady=(0, 14), anchor="w")

        # ── Stats bar ────────────────────────────────────────────────
        self._stats_bar = tk.Frame(self, bg="#ede9fe")
        self._stats_bar.pack(fill=tk.X)
        self._stats_wc_var    = tk.StringVar(value="Words: 0")
        self._stats_goal_var  = tk.StringVar(value="Goal: 0 / 500 (0 %)")
        self._stats_time_var  = tk.StringVar(value="Session: 0 min")
        for var in (self._stats_wc_var, self._stats_goal_var, self._stats_time_var):
            tk.Label(self._stats_bar, textvariable=var, bg="#ede9fe", fg="#5b21b6",
                     font=("Segoe UI", 10)).pack(side=tk.LEFT, padx=14, pady=3)

        # ── Body ─────────────────────────────────────────────────────
        body = ttk.Frame(self)
        body.pack(fill=tk.BOTH, expand=True, padx=0, pady=0)

        # ── LEFT: collapsible panel (binder + quick actions) ─────────
        self._sidebar_frame = ttk.Frame(body, style="Sidebar.TFrame", width=220)
        self._sidebar_frame.pack(side=tk.LEFT, fill=tk.Y)
        self._sidebar_frame.pack_propagate(False)
        self._build_sidebar(self._sidebar_frame)

        # ── RIGHT: notebook tabs ─────────────────────────────────────
        self._notebook = ttk.Notebook(body)
        self._notebook.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        self._build_writer_tab(self._notebook)
        self._build_ai_tab(self._notebook)
        self._build_integrations_tab(self._notebook)
        self._build_audit_tab(self._notebook)
        self._build_cover_tab(self._notebook)

    # ── Binder sidebar ───────────────────────────────────────────────

    def _build_sidebar(self, parent):
        ttk.Label(parent, text="Project Binder", style="Sidebar.TLabel").pack(
            padx=12, pady=(12, 4), anchor="w"
        )

        btn_row = ttk.Frame(parent, style="Sidebar.TFrame")
        btn_row.pack(fill=tk.X, padx=8, pady=(0, 6))
        ttk.Button(btn_row, text="+ Chapter", command=self._add_chapter).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_row, text="+ Scene",   command=self._add_scene).pack(side=tk.LEFT, padx=2)

        # Binder tree
        self._binder_tree = ttk.Treeview(parent, selectmode="browse", height=12)
        self._binder_tree.heading("#0", text="Chapters / Scenes")
        self._binder_tree.pack(fill=tk.BOTH, expand=True, padx=8)
        self._binder_tree.bind("<<TreeviewSelect>>", self._on_binder_select)

        # Quick actions
        quick = ttk.Labelframe(parent, text="Quick Actions", style="Card.TLabelframe")
        quick.pack(padx=8, pady=8, fill=tk.X)
        ttk.Button(quick, text="Detect Mode",     style="Accent.TButton", command=self.detect_mode).pack(
            fill=tk.X, padx=6, pady=3)
        ttk.Button(quick, text="To Erotic",       command=self.convert_to_erotic).pack(fill=tk.X, padx=6, pady=3)
        ttk.Button(quick, text="To Normal",       command=self.convert_to_normal).pack(fill=tk.X, padx=6, pady=3)
        ttk.Button(quick, text="Export…",         command=self.export_document).pack(fill=tk.X, padx=6, pady=3)
        ttk.Button(quick, text="Focus Mode ⛶",   command=self.toggle_focus_mode).pack(fill=tk.X, padx=6, pady=3)

    def _refresh_binder(self):
        self._binder_tree.delete(*self._binder_tree.get_children())
        for ci, ch in enumerate(self._project):
            ch_id = self._binder_tree.insert("", "end", iid=f"ch:{ci}", text=f"📖 {ch.title}", open=True)
            for si, sc in enumerate(ch.scenes):
                self._binder_tree.insert(ch_id, "end", iid=f"sc:{ci}:{si}", text=f"  📄 {sc.title}")

    def _on_binder_select(self, _event):
        sel = self._binder_tree.focus()
        if not sel:
            return
        if sel.startswith("sc:"):
            _, ci, si = sel.split(":")
            self._save_current_scene()
            self._active_chapter_idx = int(ci)
            self._active_scene_idx = int(si)
            self._load_current_scene()

    def _save_current_scene(self):
        try:
            ch = self._project[self._active_chapter_idx]
            sc = ch.scenes[self._active_scene_idx]
            sc.text = self.draft_box.get("1.0", tk.END).rstrip("\n")
        except IndexError:
            pass

    def _load_current_scene(self):
        try:
            sc = self._project[self._active_chapter_idx].scenes[self._active_scene_idx]
            self.draft_box.delete("1.0", tk.END)
            self.draft_box.insert(tk.END, sc.text)
            self._update_stats()
        except IndexError:
            pass

    def _add_chapter(self):
        title = simpledialog.askstring("New Chapter", "Chapter title:", parent=self)
        if not title:
            return
        idx = len(self._project)
        self._project.append(Chapter(id=f"ch{idx}", title=title, scenes=[]))
        self._refresh_binder()
        self._add_audit("Project", f"Added chapter: {title}.")

    def _add_scene(self):
        if not self._project:
            messagebox.showinfo("Add Scene", "Add a chapter first.")
            return
        title = simpledialog.askstring("New Scene", "Scene title:", parent=self)
        if not title:
            return
        ch = self._project[self._active_chapter_idx]
        si = len(ch.scenes)
        ch.scenes.append(Scene(id=f"s{si}", title=title))
        self._refresh_binder()
        self._add_audit("Project", f"Added scene: {title} to {ch.title}.")

    # ── Writing Studio tab ────────────────────────────────────────────

    def _build_writer_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Writing Studio")

        text_frame = ttk.Frame(frame)
        text_frame.pack(fill=tk.BOTH, expand=True, padx=16, pady=16)

        ttk.Label(text_frame, text="Draft", style="Section.TLabel").pack(anchor="w")
        self.draft_box = tk.Text(text_frame, height=14, wrap=tk.WORD, undo=True)
        self.draft_box.pack(fill=tk.BOTH, expand=True, pady=(6, 4))
        self.draft_box.bind("<KeyRelease>", lambda _e: self._update_stats())
        # Ctrl+Enter → Write Next Paragraph without leaving the editor
        self.draft_box.bind("<Control-Return>", lambda _e: (self._ai_write_next(), "break")[1])

        status_frame = ttk.Frame(text_frame)
        status_frame.pack(fill=tk.X, pady=(0, 8))
        ttk.Label(status_frame, text="Mode:", style="Section.TLabel").pack(side=tk.LEFT)
        ttk.Label(status_frame, textvariable=self.mode, foreground="#7c3aed",
                  font=("Segoe UI", 11, "bold")).pack(side=tk.LEFT, padx=8)

        ttk.Label(text_frame, text="Converted Output", style="Section.TLabel").pack(anchor="w", pady=(8, 0))
        self.convert_box = tk.Text(text_frame, height=7, wrap=tk.WORD)
        self.convert_box.pack(fill=tk.BOTH, expand=True, pady=(4, 8))

        ethics_frame = ttk.Frame(text_frame)
        ethics_frame.pack(fill=tk.X)
        ttk.Checkbutton(
            ethics_frame,
            text="I confirm consent/ethics review is complete",
            variable=self.ethics_confirmed,
        ).pack(side=tk.LEFT)
        ttk.Button(ethics_frame, text="Log Ethics Approval", command=self.log_ethics).pack(side=tk.RIGHT)

    # ── AI Writing tab ────────────────────────────────────────────────

    def _build_ai_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="AI Writing (Ollama)")

        top = ttk.Frame(frame)
        top.pack(fill=tk.X, padx=16, pady=(14, 6))

        # Model selector
        ttk.Label(top, text="Ollama model:").pack(side=tk.LEFT)
        ttk.Entry(top, textvariable=self.ollama_model, width=20).pack(side=tk.LEFT, padx=6)
        ttk.Label(top, text="Daily goal (words):").pack(side=tk.LEFT, padx=(12, 0))
        ttk.Spinbox(top, from_=100, to=10000, increment=100, textvariable=self.daily_goal, width=7).pack(side=tk.LEFT, padx=6)

        # Action buttons
        btn_row = ttk.Frame(frame)
        btn_row.pack(fill=tk.X, padx=16, pady=4)
        ttk.Button(btn_row, text="✨ Write Next Paragraph",
                   style="Accent.TButton", command=self._ai_write_next).pack(side=tk.LEFT, padx=4)
        ttk.Button(btn_row, text="🔄 Rewrite Selection",
                   command=self._ai_rewrite_selection).pack(side=tk.LEFT, padx=4)
        ttk.Button(btn_row, text="💡 Brainstorm Ideas",
                   command=self._ai_brainstorm).pack(side=tk.LEFT, padx=4)
        ttk.Button(btn_row, text="📝 Summarise Scene",
                   command=self._ai_summarise).pack(side=tk.LEFT, padx=4)
        self._ai_thinking_var = tk.StringVar(value="")
        ttk.Label(btn_row, textvariable=self._ai_thinking_var, foreground="#7c3aed").pack(side=tk.LEFT, padx=8)

        # Custom prompt
        prompt_frame = ttk.LabelFrame(frame, text="Custom AI Prompt", style="Card.TLabelframe")
        prompt_frame.pack(fill=tk.X, padx=16, pady=8)
        self._custom_prompt_box = tk.Text(prompt_frame, height=3, wrap=tk.WORD)
        self._custom_prompt_box.pack(fill=tk.X, padx=8, pady=(4, 0))
        self._custom_prompt_box.insert(tk.END, "Continue the story in the same style...")
        ttk.Button(prompt_frame, text="Run Custom Prompt", command=self._ai_custom).pack(
            anchor="e", padx=8, pady=6)

        # AI output
        out_frame = ttk.LabelFrame(frame, text="AI Output", style="Card.TLabelframe")
        out_frame.pack(fill=tk.BOTH, expand=True, padx=16, pady=(0, 12))
        self._ai_output_box = tk.Text(out_frame, height=12, wrap=tk.WORD, background="#faf5ff")
        self._ai_output_box.pack(fill=tk.BOTH, expand=True, padx=8, pady=6)

        action_row = ttk.Frame(out_frame)
        action_row.pack(fill=tk.X, padx=8, pady=(0, 8))
        ttk.Button(action_row, text="Accept → Append to Draft",
                   style="Accent.TButton", command=self._accept_ai_output).pack(side=tk.LEFT, padx=4)
        ttk.Button(action_row, text="Clear", command=self._clear_ai_output).pack(side=tk.LEFT, padx=4)

    # ── Integrations tab ──────────────────────────────────────────────

    def _build_integrations_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Integrations")

        ttk.Label(
            frame,
            text=(
                "Connect to local Ollama for writing and Stable Diffusion WebUI for cover art. "
                "Data stays on your machine."
            ),
            wraplength=760,
            justify=tk.LEFT,
        ).pack(fill=tk.X, padx=16, pady=(16, 8))

        status_frame = ttk.LabelFrame(frame, text="Status", style="Card.TLabelframe")
        status_frame.pack(fill=tk.X, padx=16, pady=8)
        ttk.Label(status_frame, text="Ollama status:", style="Section.TLabel").grid(
            row=0, column=0, sticky="w", padx=8, pady=6)
        ttk.Label(status_frame, textvariable=self.ollama_status).grid(row=0, column=1, sticky="w")
        ttk.Label(status_frame, text="Image status:", style="Section.TLabel").grid(
            row=1, column=0, sticky="w", padx=8, pady=6)
        ttk.Label(status_frame, textvariable=self.image_status).grid(row=1, column=1, sticky="w")

        form = ttk.LabelFrame(frame, text="Endpoints", style="Card.TLabelframe")
        form.pack(fill=tk.X, padx=16, pady=12)
        ttk.Label(form, text="Ollama URL").grid(row=0, column=0, sticky="w", padx=8, pady=6)
        ttk.Entry(form, textvariable=self.ollama_url, width=50).grid(row=0, column=1, sticky="w")
        ttk.Button(form, text="Test", command=self.check_ollama).grid(row=0, column=2, padx=8)
        ttk.Label(form, text="Image URL").grid(row=1, column=0, sticky="w", padx=8, pady=6)
        ttk.Entry(form, textvariable=self.image_url, width=50).grid(row=1, column=1, sticky="w")
        ttk.Button(form, text="Test", command=self.check_image).grid(row=1, column=2, padx=8)

        ttk.Label(
            frame,
            text="Suggested models: llama3, mistral, dolphin-mixtral. Use: ollama pull <model>",
            foreground="#6b7280",
        ).pack(fill=tk.X, padx=16, pady=(0, 16))

    # ── Audit Log tab ─────────────────────────────────────────────────

    def _build_audit_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Audit Log")
        ttk.Label(frame, text="Actions recorded in this session.", style="Section.TLabel").pack(
            anchor="w", padx=16, pady=12)
        self.audit_list = tk.Listbox(frame, height=18)
        self.audit_list.pack(fill=tk.BOTH, expand=True, padx=16, pady=(0, 16))

    # ── Cover Preview tab ─────────────────────────────────────────────

    def _build_cover_tab(self, notebook):
        frame = ttk.Frame(notebook)
        notebook.add(frame, text="Cover Preview")

        ttk.Label(frame, text="Cover Art Preview", style="Section.TLabel").pack(
            anchor="w", padx=16, pady=(16, 8))
        canvas = tk.Canvas(frame, width=360, height=480, bg="#f3f4f6",
                           highlightthickness=1, highlightbackground="#d1d5db")
        canvas.pack(padx=16, pady=(0, 12), anchor="w")
        canvas.create_rectangle(20, 20, 340, 460, outline="#7c3aed", width=2)
        canvas.create_text(180, 200, text="Cover Preview", fill="#6b7280",
                           font=("Segoe UI", 14, "bold"))
        canvas.create_text(180, 240, text="Connect your image generator\nand import a cover here.",
                           fill="#9ca3af", font=("Segoe UI", 10))

        ttk.Label(
            frame,
            text="Tip: Generate cover art with your local Stable Diffusion WebUI then load it here.",
            foreground="#6b7280",
            wraplength=760,
            justify=tk.LEFT,
        ).pack(fill=tk.X, padx=16, pady=(0, 8))
        ttk.Button(frame, text="Load Cover Image", command=self.load_cover_image).pack(
            padx=16, pady=(0, 16), anchor="w")
        self.cover_canvas = canvas

    # ── Stats ticker ──────────────────────────────────────────────────

    def _start_stats_ticker(self):
        self._update_stats()
        self.after(30_000, self._start_stats_ticker)

    def _update_stats(self):
        try:
            text  = self.draft_box.get("1.0", tk.END)
            words = len(text.split()) if text.strip() else 0
            goal  = self.daily_goal.get()
            pct   = min(100, round(words * 100 / goal)) if goal else 0
            elapsed = round((time.time() - self._session_start) / 60)
            self._stats_wc_var.set(f"Words: {words:,}")
            self._stats_goal_var.set(f"Goal: {words:,} / {goal:,} ({pct} %)")
            self._stats_time_var.set(f"Session: {elapsed} min")
        except Exception:
            pass

    # ── Focus mode ────────────────────────────────────────────────────

    def toggle_focus_mode(self):
        if self._focus_mode:
            self._sidebar_frame.pack(side=tk.LEFT, fill=tk.Y, before=self._notebook)
            self._stats_bar.pack(fill=tk.X, before=self._notebook.master)
            self.attributes("-fullscreen", False)
            self._focus_mode = False
            self._add_audit("Focus Mode", "Exited focus mode.")
        else:
            self._save_current_scene()
            self._sidebar_frame.pack_forget()
            self._stats_bar.pack_forget()
            self.attributes("-fullscreen", True)
            self._focus_mode = True
            self._add_audit("Focus Mode", "Entered focus mode.")

    # ── AI helpers ────────────────────────────────────────────────────

    def _ollama_generate(self, prompt: str, callback):
        """Call Ollama /api/generate in a background thread; invoke callback(text) on the main loop."""
        def _run():
            url = f"{self.ollama_url.get()}/api/generate"
            payload = json.dumps({
                "model": self.ollama_model.get() or "llama3",
                "prompt": prompt,
                "stream": False,
            }).encode()
            try:
                req = urllib.request.Request(
                    url, data=payload,
                    headers={"Content-Type": "application/json"},
                    method="POST",
                )
                with urllib.request.urlopen(req, timeout=60) as resp:
                    data = json.loads(resp.read().decode())
                    text = data.get("response", "").strip()
            except Exception as exc:
                text = f"[Ollama error: {exc}]"
            self.after(0, lambda: callback(text))
        threading.Thread(target=_run, daemon=True).start()

    def _get_draft_context(self, max_chars: int = 1200) -> str:
        raw = self.draft_box.get("1.0", tk.END).strip()
        return raw[-max_chars:] if len(raw) > max_chars else raw

    def _ai_write_next(self):
        ctx = self._get_draft_context()
        if not ctx:
            messagebox.showinfo("AI", "Write something in the draft first.")
            return
        prompt = (
            "You are a creative writing assistant. Continue the following story excerpt with one "
            "compelling paragraph (roughly 80–120 words). Match the style, tone, and voice already present.\n\n"
            f"EXCERPT:\n{ctx}\n\nCONTINUATION:"
        )
        self._set_ai_thinking(True)
        self._ollama_generate(prompt, self._set_ai_output)

    def _ai_rewrite_selection(self):
        try:
            sel = self.draft_box.get(tk.SEL_FIRST, tk.SEL_LAST)
        except tk.TclError:
            messagebox.showinfo("AI", "Select some text in the draft first.")
            return
        prompt = (
            "You are a creative writing editor. Rewrite the following passage to improve clarity, "
            "flow, and style. Keep the same meaning and narrative voice.\n\n"
            f"ORIGINAL:\n{sel}\n\nREWRITTEN:"
        )
        self._set_ai_thinking(True)
        self._ollama_generate(prompt, self._set_ai_output)

    def _ai_brainstorm(self):
        ctx = self._get_draft_context(600)
        prompt = (
            "You are a story development coach. Based on the excerpt below, brainstorm 5 compelling "
            "ideas for what could happen next in the story. Number them and be specific.\n\n"
            f"EXCERPT:\n{ctx}\n\nIDEAS:"
        )
        self._set_ai_thinking(True)
        self._ollama_generate(prompt, self._set_ai_output)

    def _ai_summarise(self):
        ctx = self.draft_box.get("1.0", tk.END).strip()
        if not ctx:
            messagebox.showinfo("AI", "Nothing in the draft to summarise.")
            return
        prompt = (
            "Summarise the following scene in 2–3 sentences, capturing the key events, "
            "emotional beats, and any important revelations.\n\n"
            f"SCENE:\n{ctx}\n\nSUMMARY:"
        )
        self._set_ai_thinking(True)
        self._ollama_generate(prompt, self._set_ai_output)

    def _ai_custom(self):
        custom = self._custom_prompt_box.get("1.0", tk.END).strip()
        if not custom:
            messagebox.showinfo("AI", "Enter a custom prompt first.")
            return
        ctx = self._get_draft_context(800)
        prompt = f"{custom}\n\nCONTEXT:\n{ctx}\n\nRESPONSE:"
        self._set_ai_thinking(True)
        self._ollama_generate(prompt, self._set_ai_output)

    def _set_ai_thinking(self, thinking: bool):
        self._ai_thinking_var.set("⏳ AI thinking…" if thinking else "")
        self._ai_output_box.config(state=tk.NORMAL)

    def _set_ai_output(self, text: str):
        self._ai_thinking_var.set("")
        self._ai_output_box.delete("1.0", tk.END)
        self._ai_output_box.insert(tk.END, text)
        self._add_audit("AI Writing", f"Generated {len(text.split())} words via Ollama.")

    def _accept_ai_output(self):
        text = self._ai_output_box.get("1.0", tk.END).strip()
        if not text:
            return
        # Insert at the current cursor position (INSERT mark); fall back to end
        try:
            insert_pos = self.draft_box.index(tk.INSERT)
            # If cursor is at very start (1.0) and there's existing text, append
            if insert_pos == "1.0" and self.draft_box.get("1.0", tk.END).strip():
                insert_pos = tk.END
                self.draft_box.insert(insert_pos, "\n\n" + text)
            else:
                # Insert a blank line separator unless already on a blank line
                prefix = "" if self.draft_box.get(f"{insert_pos} linestart", insert_pos).strip() == "" else "\n\n"
                self.draft_box.insert(insert_pos, prefix + text + "\n\n")
                self.draft_box.mark_set(tk.INSERT, f"{insert_pos}+{len(prefix + text + chr(10) + chr(10))}c")
        except tk.TclError:
            self.draft_box.insert(tk.END, "\n\n" + text)
        self._save_current_scene()
        self._update_stats()
        self._add_audit("AI Writing", "Accepted AI output into draft.")

    def _clear_ai_output(self):
        self._ai_output_box.delete("1.0", tk.END)

    # ── Existing actions ──────────────────────────────────────────────

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
        self._save_current_scene()
        # Collect full manuscript
        lines = []
        for ch in self._project:
            lines.append(f"\n{'='*60}\n{ch.title}\n{'='*60}\n")
            for sc in ch.scenes:
                if sc.title:
                    lines.append(f"\n--- {sc.title} ---\n")
                if sc.text:
                    lines.append(sc.text + "\n")
        content = "\n".join(lines).strip()
        if not content:
            messagebox.showinfo("Export", "Nothing to export yet.")
            return
        filename = filedialog.asksaveasfilename(
            title="Export Manuscript",
            defaultextension=".txt",
            filetypes=[
                ("Text files", "*.txt"),
                ("Markdown files", "*.md"),
                ("HTML files", "*.html"),
                ("All files", "*.*"),
            ],
        )
        if not filename:
            return
        if filename.endswith(".html"):
            # Minimal HTML export
            paras = [f"<p>{p}</p>" for p in content.split("\n\n") if p.strip()]
            html = f"<!DOCTYPE html><html><head><meta charset='utf-8'><title>Manuscript</title></head><body>\n"
            html += "\n".join(paras) + "\n</body></html>"
            with open(filename, "w", encoding="utf-8") as fh:
                fh.write(html)
        else:
            with open(filename, "w", encoding="utf-8") as fh:
                fh.write(content)
        self._add_audit("Export", f"Exported manuscript to {filename}.")

    def check_ollama(self):
        self.ollama_status.set(self._probe_url(self.ollama_url.get(), "/api/tags"))

    def check_image(self):
        self.image_status.set(self._probe_url(self.image_url.get(), "/sdapi/v1/options"))

    def _probe_url(self, base_url: str, path: str) -> str:
        url = f"{base_url}{path}"
        try:
            with request.urlopen(url, timeout=3) as response:
                status = "Online" if response.status == 200 else f"HTTP {response.status}"
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
        if hasattr(self, "audit_list"):
            self.audit_list.insert(tk.END, f"{entry.timestamp} | {entry.action} | {entry.details}")

    # ── JSON project file (shared format with web app) ────────────────

    def _project_to_dict(self) -> dict:
        """Serialise the project to the shared JSON format (chapters → scenes → text)."""
        self._save_current_scene()
        return {
            "version": 1,
            "chapters": [
                {
                    "id": ch.id,
                    "title": ch.title,
                    "scenes": [
                        {"id": sc.id, "title": sc.title, "text": sc.text}
                        for sc in ch.scenes
                    ],
                }
                for ch in self._project
            ],
        }

    def _project_from_dict(self, data: dict):
        """Load a project from the shared JSON format."""
        self._project = []
        for ch_data in data.get("chapters", []):
            ch = Chapter(id=ch_data.get("id", ""), title=ch_data.get("title", "Untitled Chapter"))
            for sc_data in ch_data.get("scenes", []):
                ch.scenes.append(Scene(
                    id=sc_data.get("id", ""),
                    title=sc_data.get("title", "Untitled Scene"),
                    text=sc_data.get("text", ""),
                ))
            if not ch.scenes:
                ch.scenes.append(Scene(id="s1", title="Scene 1"))
            self._project.append(ch)
        if not self._project:
            self._project = [Chapter(id="ch1", title="Chapter 1",
                                     scenes=[Scene(id="s1", title="Opening Scene")])]
        self._active_chapter_idx = 0
        self._active_scene_idx = 0
        self._refresh_binder()
        self._load_current_scene()

    def _project_new(self):
        if not messagebox.askyesno("New Project", "Discard current project and start a new one?"):
            return
        self._project = [Chapter(id="ch1", title="Chapter 1",
                                 scenes=[Scene(id="s1", title="Opening Scene")])]
        self._active_chapter_idx = 0
        self._active_scene_idx = 0
        self._project_file = None
        self.title("Book Publish Forge")
        self._refresh_binder()
        self._load_current_scene()
        self._add_audit("Project", "Created new project.")

    def _project_open(self):
        filename = filedialog.askopenfilename(
            title="Open Project",
            filetypes=[("Book Publish Forge project", "*.bpf.json"), ("JSON files", "*.json"), ("All files", "*.*")],
        )
        if not filename:
            return
        try:
            with open(filename, encoding="utf-8") as fh:
                data = json.load(fh)
            self._project_from_dict(data)
            self._project_file = filename
            self.title(f"Book Publish Forge — {os.path.basename(filename)}")
            self._add_audit("Project", f"Opened project: {filename}.")
        except Exception as exc:
            messagebox.showerror("Open Project", f"Could not open project:\n{exc}")

    def _project_save(self):
        if not self._project_file:
            self._project_save_as()
            return
        self._write_project_file(self._project_file)

    def _project_save_as(self):
        filename = filedialog.asksaveasfilename(
            title="Save Project As",
            defaultextension=".bpf.json",
            filetypes=[("Book Publish Forge project", "*.bpf.json"), ("JSON files", "*.json"), ("All files", "*.*")],
        )
        if not filename:
            return
        self._project_file = filename
        self.title(f"Book Publish Forge — {os.path.basename(filename)}")
        self._write_project_file(filename)

    def _write_project_file(self, filename: str):
        try:
            with open(filename, "w", encoding="utf-8") as fh:
                json.dump(self._project_to_dict(), fh, ensure_ascii=False, indent=2)
            self._add_audit("Project", f"Saved project: {filename}.")
        except Exception as exc:
            messagebox.showerror("Save Project", f"Could not save project:\n{exc}")


if __name__ == "__main__":
    app = BookPublishForgeApp()
    app.mainloop()

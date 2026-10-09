import { callAI, checkAIAvailability } from "./aiService";

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("cloud backends are rejected before any request is sent", async () => {
  await expect(callAI("private manuscript", { backend: "openai" }))
    .rejects.toThrow("disabled");
  expect(global.fetch).not.toHaveBeenCalled();
});

test("remote Ollama addresses are rejected before any request", async () => {
  localStorage.setItem("ollama_url", "https://remote.example.com");
  await expect(callAI("private manuscript")).rejects.toThrow("loopback");
  expect(global.fetch).not.toHaveBeenCalled();
});

test("local Ollama receives a nonstreaming request without secrets", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ response: "local reply" })
  });
  expect(await callAI("hello", { model: "qwen3:8b" })).toBe("local reply");
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const [url, options] = global.fetch.mock.calls[0];
  expect(url).toBe("http://127.0.0.1:11434/api/generate");
  expect(options.body).toContain("qwen3:8b");
  expect(options.body).not.toContain("api_key");
});

test("cloud model check returns unavailable without a network request", async () => {
  expect(await checkAIAvailability("openai")).toBe(false);
  expect(global.fetch).not.toHaveBeenCalled();
});

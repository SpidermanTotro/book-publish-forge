/**
 * Book Publish Forge web AI: local-only Ollama.
 *
 * Browser bundles must never contain provider API keys; remote inference is
 * deliberately disabled. A future cloud mode requires separate opt-in design.
 */
const DEFAULT_OLLAMA_URL = 'http://127.0.0.1:11434';
const DEFAULT_MODEL = 'qwen3:8b';

function localConfig() {
  const read = key => {
    try { return window.localStorage.getItem(key); } catch { return null; }
  };
  const base = read('ollama_url') || process.env.REACT_APP_OLLAMA_URL || DEFAULT_OLLAMA_URL;
  const url = new URL(base);
  if (!['http:', 'https:'].includes(url.protocol) ||
      !['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) ||
      url.username || url.password || url.search || url.hash) {
    throw new Error('Only loopback Ollama addresses are supported; no remote inference.');
  }
  return {
    ollamaUrl: url.origin,
    ollamaModel: read('ollama_model') || process.env.REACT_APP_OLLAMA_MODEL || DEFAULT_MODEL,
    backend: 'ollama'
  };
}

const AI_CONFIG = { backend: 'ollama', ollamaUrl: DEFAULT_OLLAMA_URL, ollamaModel: DEFAULT_MODEL };

export async function callAI(prompt, options = {}) {
  if (options.backend && options.backend !== 'ollama') {
    throw new Error('Cloud and custom AI backends are disabled in this local-only build.');
  }
  const config = localConfig();
  const { model = config.ollamaModel, temperature = 0.7 } = options;
  const response = await fetch(config.ollamaUrl + '/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, options: { temperature }, stream: false })
  });
  if (!response.ok) throw new Error('Local Ollama request failed (HTTP ' + response.status + ')');
  const result = await response.json();
  return result.response || '';
}

export async function checkAIAvailability(backend = 'ollama') {
  if (backend !== 'ollama') return false;
  try {
    const config = localConfig();
    const response = await fetch(config.ollamaUrl + '/api/tags', {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch { return false; }
}

/**
 * Convert text to erotic/adult style using REAL LLM
 */
export async function convertToErotic(text, options = {}) {
  const prompt = `You are a professional romance and erotica editor. Transform the following text to make it more sensual, romantic, and adult-appropriate while maintaining the core narrative and respecting consent themes.

Guidelines:
- Heighten sensory details (touch, sight, sound)
- Use more passionate, intimate language
- Add tension and romantic chemistry
- Keep it tasteful and respectful
- Maintain character agency and consent

Original text:
${text}

Provide ONLY the transformed text, no explanations:`;

  return await callAI(prompt, { ...options, temperature: 0.8 });
}

/**
 * Convert text to normal/general style using REAL LLM
 */
export async function convertToNormal(text, options = {}) {
  const prompt = `You are a professional editor. Transform the following text to make it appropriate for general audiences while maintaining the core story and emotional impact.

Guidelines:
- Replace explicit language with tasteful alternatives
- Maintain romantic tension without explicit content
- Keep the emotional depth and character development
- Use elegant, literary language
- Preserve the narrative flow

Original text:
${text}

Provide ONLY the transformed text, no explanations:`;

  return await callAI(prompt, { ...options, temperature: 0.7 });
}

/**
 * Detect content type using REAL LLM
 */
export async function detectContentType(text, options = {}) {
  const prompt = `Analyze the following text and classify it as either "normal" (general audience) or "erotic" (adult content).

Consider:
- Explicit language and descriptions
- Sexual or intimate content
- Adult themes
- Sensual language intensity

Text:
${text}

Respond with ONLY one word: "normal" or "erotic"`;

  const response = await callAI(prompt, { ...options, temperature: 0.3 });
  return response.toLowerCase().trim().includes('erotic') ? 'erotic' : 'normal';
}

/**
 * Generate writing assistance using REAL LLM
 */
export async function getWritingHelp(context, data, options = {}) {
  const prompts = {
    project: `Write a compelling one-paragraph blurb for this novel project: ${JSON.stringify(data)}`,
    character: `Create a vivid character description for: ${data.name || 'character'}. Description: ${data.description || ''}`,
    location: `Write a descriptive paragraph for this location: ${data.name || 'location'}`,
    scene: `Continue this scene or suggest what happens next: ${data.content || data.description || ''}`
  };
  
  const prompt = prompts[context] || prompts.scene;
  return await callAI(prompt, options);
}

/**
 * Check grammar and style using REAL LLM
 */
export async function checkGrammarAndStyle(text, options = {}) {
  const prompt = `You are a professional editor. Analyze this text for grammar, style, and plot consistency issues. Provide specific, actionable suggestions.

Text:
${text}

Format your response as a JSON array of objects with: type, finding, correction, why
Example: [{"type":"grammar","finding":"Run-on sentence","correction":"Split into two sentences","why":"Improves readability"}]`;

  const response = await callAI(prompt, { ...options, temperature: 0.4 });
  
  try {
    return JSON.parse(response);
  } catch {
    // If LLM doesn't return valid JSON, create structured response
    return [{
      type: 'analysis',
      finding: 'AI analysis complete',
      correction: response,
      why: 'Based on professional editing standards'
    }];
  }
}

/**
 * Generate story beats using REAL LLM
 */
export async function generateStoryBeats(context, options = {}) {
  const prompt = `You are a story structure expert. Generate compelling story beats for: ${context}

Provide 5-7 key story beats that create a compelling narrative arc. Format as a numbered list.`;

  return await callAI(prompt, { ...options, temperature: 0.8 });
}

const aiService = {
  callAI,
  checkAIAvailability,
  convertToErotic,
  convertToNormal,
  detectContentType,
  getWritingHelp,
  checkGrammarAndStyle,
  generateStoryBeats,
  config: AI_CONFIG
};

export default aiService;

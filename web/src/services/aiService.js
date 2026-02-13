/**
 * AI Service Integration
 * 
 * Supports multiple AI backends:
 * 1. Ollama (local, privacy-first) - matches desktop app
 * 2. OpenAI API (cloud-based)
 * 3. Custom API endpoint
 */

// Configuration from environment or defaults
const AI_CONFIG = {
  // Ollama (local, like desktop app)
  ollamaUrl: process.env.REACT_APP_OLLAMA_URL || 'http://127.0.0.1:11434',
  ollamaModel: process.env.REACT_APP_OLLAMA_MODEL || 'dolphin-mixtral',
  
  // OpenAI (cloud, requires API key)
  openaiKey: process.env.REACT_APP_OPENAI_KEY || '',
  openaiModel: process.env.REACT_APP_OPENAI_MODEL || 'gpt-4',
  
  // Preferred backend: 'ollama' | 'openai' | 'custom'
  backend: process.env.REACT_APP_AI_BACKEND || 'ollama',
  
  // Custom API endpoint
  customUrl: process.env.REACT_APP_CUSTOM_AI_URL || '',
};

/**
 * Call Ollama API (local LLM)
 */
async function callOllama(prompt, options = {}) {
  const { model = AI_CONFIG.ollamaModel, temperature = 0.7, stream = false } = options;
  
  try {
    const response = await fetch(`${AI_CONFIG.ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        temperature,
        stream
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response || '';
  } catch (error) {
    console.error('Ollama API failed:', error);
    throw new Error(`Ollama unavailable. Make sure Ollama is running at ${AI_CONFIG.ollamaUrl}`);
  }
}

/**
 * Call OpenAI API (cloud LLM)
 */
async function callOpenAI(prompt, options = {}) {
  const { model = AI_CONFIG.openaiModel, temperature = 0.7, maxTokens = 500 } = options;
  
  if (!AI_CONFIG.openaiKey) {
    throw new Error('OpenAI API key not configured. Set REACT_APP_OPENAI_KEY environment variable.');
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.openaiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature,
        max_tokens: maxTokens
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API failed:', error);
    throw error;
  }
}

/**
 * Main AI call function - automatically uses configured backend
 */
export async function callAI(prompt, options = {}) {
  const { backend = AI_CONFIG.backend } = options;
  
  switch (backend) {
    case 'ollama':
      return await callOllama(prompt, options);
    case 'openai':
      return await callOpenAI(prompt, options);
    case 'custom':
      if (!AI_CONFIG.customUrl) {
        throw new Error('Custom AI URL not configured');
      }
      // Implement custom endpoint call here
      throw new Error('Custom backend not yet implemented');
    default:
      throw new Error(`Unknown AI backend: ${backend}`);
  }
}

/**
 * Check if AI service is available
 */
export async function checkAIAvailability(backend = AI_CONFIG.backend) {
  try {
    if (backend === 'ollama') {
      const response = await fetch(`${AI_CONFIG.ollamaUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      return response.ok;
    } else if (backend === 'openai') {
      return !!AI_CONFIG.openaiKey;
    }
    return false;
  } catch {
    return false;
  }
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

export default {
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

import React, { useState } from 'react';

export default function AIWritingTools() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [demoInput, setDemoInput] = useState('');
  const [demoOutput, setDemoOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: '🌟', color: '#6366f1' },
    { id: 'writing', name: 'Writing & Generation', icon: '✍️', color: '#8b5cf6' },
    { id: 'editing', name: 'Editing & Polish', icon: '✨', color: '#ec4899' },
    { id: 'story', name: 'Story Development', icon: '📚', color: '#f59e0b' },
    { id: 'character', name: 'Character Tools', icon: '👥', color: '#10b981' },
    { id: 'research', name: 'Research & World', icon: '🌍', color: '#06b6d4' },
  ];

  const aiTools = [
    // Writing & Generation
    { id: 1, category: 'writing', name: 'AI Writing Companion', icon: '💬', description: 'Interactive AI that helps you brainstorm, develop ideas, and overcome writer\'s block', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 2, category: 'writing', name: 'Scene Generator', icon: '🎬', description: 'Generate complete scenes with vivid descriptions, dialogue, and emotional depth', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 3, category: 'writing', name: 'Beat Sheet Creator', icon: '📝', description: 'Create structured story beats using Save the Cat, Hero\'s Journey, or custom frameworks', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 4, category: 'writing', name: 'Dialogue Generator', icon: '💭', description: 'Generate character-specific dialogue with proper voice, tone, and personality', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 5, category: 'writing', name: 'Turn-Based Co-Writer', icon: '🔄', description: 'Collaborate with AI paragraph by paragraph to write compelling scenes together', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    
    // Editing & Polish
    { id: 6, category: 'editing', name: 'Smart Grammar & Style', icon: '🔍', description: 'Advanced grammar, punctuation, and style checking tailored to your genre', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    { id: 7, category: 'editing', name: 'Show Don\'t Tell Coach', icon: '🎨', description: 'Transform telling into showing with specific, actionable rewrites', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { id: 8, category: 'editing', name: 'Pacing Analyzer', icon: '📊', description: 'Analyze sentence rhythm, chapter pacing, and tension curves', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { id: 9, category: 'editing', name: 'Prose Polisher', icon: '💎', description: 'Elevate your prose with stronger verbs, vivid imagery, and elegant phrasing', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { id: 10, category: 'editing', name: 'Redundancy Trimmer', icon: '✂️', description: 'Identify and eliminate unnecessary words, phrases, and repetitive content', gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)' },
    
    // Story Development
    { id: 11, category: 'story', name: 'Plot Consistency Checker', icon: '🧩', description: 'Detect plot holes, timeline issues, and continuity errors across chapters', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { id: 12, category: 'story', name: 'Story Arc Visualizer', icon: '📈', description: 'Visualize your three-act structure, rising action, and emotional beats', gradient: 'linear-gradient(135deg, #f8b195 0%, #f67280 100%)' },
    { id: 13, category: 'story', name: 'Theme Analyzer', icon: '🎭', description: 'Identify and strengthen thematic elements throughout your manuscript', gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
    { id: 14, category: 'story', name: 'Sequel Generator', icon: '🔮', description: 'Generate sequel premises, plot ideas, and character arcs based on your work', gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
    { id: 15, category: 'story', name: 'Subplot Weaver', icon: '🕸️', description: 'Create and integrate compelling subplots that enhance your main story', gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)' },
    
    // Character Tools
    { id: 16, category: 'character', name: 'Character Profile Builder', icon: '👤', description: 'Generate comprehensive character profiles with backstory, goals, and flaws', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { id: 17, category: 'character', name: 'Character Arc Planner', icon: '📊', description: 'Plan character transformation from beginning to end with key moments', gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)' },
    { id: 18, category: 'character', name: 'Voice Consistency Checker', icon: '🗣️', description: 'Ensure each character\'s dialogue and perspective stays true to their voice', gradient: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)' },
    { id: 19, category: 'character', name: 'Relationship Mapper', icon: '💞', description: 'Visualize and develop complex character relationships and dynamics', gradient: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)' },
    { id: 20, category: 'character', name: 'Name Generator', icon: '🏷️', description: 'Generate culturally appropriate names with meanings for any setting', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    
    // Research & World
    { id: 21, category: 'research', name: 'World Builder Pro', icon: '🌍', description: 'Create detailed worlds with geography, politics, magic systems, and cultures', gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)' },
    { id: 22, category: 'research', name: 'Historical Research Assistant', icon: '📜', description: 'Get accurate historical facts, customs, and context for period pieces', gradient: 'linear-gradient(135deg, #aa4b6b 0%, #6b6b83 100%)' },
    { id: 23, category: 'research', name: 'Setting Generator', icon: '🏰', description: 'Generate vivid, sensory-rich descriptions for any location or setting', gradient: 'linear-gradient(135deg, #3b41c5 0%, #a981bb 100%)' },
    { id: 24, category: 'research', name: 'Magic System Creator', icon: '✨', description: 'Design consistent, logical magic systems with rules and limitations', gradient: 'linear-gradient(135deg, #b490ca 0%, #5ee7df 100%)' },
    { id: 25, category: 'research', name: 'Cultural Detail Generator', icon: '🎎', description: 'Create believable cultures with customs, traditions, and social structures', gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },
  ];

  const filteredTools = activeCategory === 'all' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === activeCategory);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setDemoOutput('');
    setDemoInput('');
  };

  const handleDemoRun = async () => {
    if (!demoInput.trim()) return;
    setIsProcessing(true);
    setDemoOutput('');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = {
      'AI Writing Companion': `💡 **Creative Suggestions:**

Based on your input, here are some directions to explore:

1. **Deepen the Conflict**: What if the protagonist's greatest strength becomes their weakness in this moment?

2. **Add Sensory Details**: Consider the smell of rain on hot pavement, the sound of distant thunder, the weight of silence between characters.

3. **Raise the Stakes**: What does your character stand to lose if they make the wrong choice here?

4. **Unexpected Turn**: Perhaps introduce a detail that changes everything - a letter, a stranger, a memory surfacing.

Would you like me to help develop any of these directions further?`,
      
      'Scene Generator': `🎬 **Generated Scene:**

The coffee shop hummed with the gentle murmur of afternoon conversations. Sarah's fingers wrapped around her mug, seeking warmth she couldn't find elsewhere. Across from her, Marcus shifted in his seat—a tell she'd learned to read over three years of marriage.

"I saw the realtor's card," he said finally, voice carefully neutral.

The words hung between them like smoke. Sarah set down her cup, the ceramic clicking against the saucer louder than she intended.

"I was going to tell you." The lie tasted bitter. She'd been carrying that card for two weeks, its edges softening in her pocket.

Outside, rain began to streak the windows, distorting the city beyond into watercolor shapes. Marcus reached across the table, his hand stopping just short of hers—a bridge neither quite dared to cross.`,
      
      'Plot Consistency Checker': `🧩 **Analysis Results:**

**Timeline Issues Found: 2**
• Chapter 3: Character arrives in Boston on Monday
• Chapter 7: References "last Tuesday in Boston" (should be Monday)

**Continuity Errors: 1**
• Chapter 5: Character's car is described as blue sedan
• Chapter 9: Same car referred to as gray SUV

**Character Consistency: ✓ Strong**
Voice and personality remain consistent throughout

**Setting Details: ⚠️ Minor issues**
• Coffee shop named "The Daily Grind" in Ch. 2, "Daily Grounds" in Ch. 6

**Suggestions:**
Consider creating a story bible to track key details across chapters.`,
      
      'Show Don\'t Tell Coach': `🎨 **Transformation Suggestions:**

**Original (Telling):**
"She was very angry at him."

**Improved (Showing):**
"Her jaw clenched as she turned away, fingers curling into fists at her sides. When she spoke, each word came out clipped, precise—the tone she used when trying not to scream."

**Why it works:**
• Physical manifestations (clenched jaw, fists)
• Behavioral changes (turning away)
• Specific details (clipped words, controlled tone)
• Subtext (trying not to scream reveals depth of anger)

**More examples based on your text...**`
    };

    setDemoOutput(responses[selectedTool?.name] || `✨ **AI Generated Response:**

This is a demonstration of the ${selectedTool?.name} tool. In production, this would provide:

• Detailed analysis of your input
• Specific, actionable suggestions
• Generated content tailored to your needs
• Context-aware improvements

Your input: "${demoInput.slice(0, 100)}${demoInput.length > 100 ? '...' : ''}"

The AI would now provide comprehensive feedback and suggestions based on the specific tool you've selected.`);
    
    setIsProcessing(false);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Hero Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          color: '#fff'
        }}>
          <h1 style={{
            fontSize: '3.5em',
            fontWeight: '800',
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            background: 'linear-gradient(to right, #fff, #e0e7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🤖 AI Writing Tools Suite
          </h1>
          <p style={{
            fontSize: '1.4em',
            maxWidth: '800px',
            margin: '0 auto 30px',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            lineHeight: '1.6'
          }}>
            25+ Professional AI Tools for Every Stage of Your Writing Journey
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <StatBadge icon="✨" number="25+" label="AI Tools" />
            <StatBadge icon="🎯" number="6" label="Categories" />
            <StatBadge icon="⚡" number="Real-time" label="Processing" />
            <StatBadge icon="🔒" number="100%" label="Private" />
          </div>
        </div>

        {/* Category Filter */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '16px 20px',
                  background: activeCategory === cat.id ? cat.color : '#f8f9fa',
                  color: activeCategory === cat.id ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1em',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
                  transform: activeCategory === cat.id ? 'translateY(-2px)' : 'none'
                }}
              >
                <div style={{ fontSize: '1.5em', marginBottom: '5px' }}>{cat.icon}</div>
                <div>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              onClick={() => handleToolSelect(tool)}
              style={{
                background: selectedTool?.id === tool.id ? '#fff' : 'rgba(255,255,255,0.95)',
                borderRadius: '16px',
                padding: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedTool?.id === tool.id 
                  ? '0 15px 35px rgba(0,0,0,0.3)' 
                  : '0 5px 20px rgba(0,0,0,0.15)',
                transform: selectedTool?.id === tool.id ? 'translateY(-5px) scale(1.02)' : 'none',
                border: selectedTool?.id === tool.id ? '2px solid #667eea' : '2px solid transparent'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: tool.gradient,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2em',
                marginBottom: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                {tool.icon}
              </div>
              <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '1.3em',
                color: '#1f2937'
              }}>
                {tool.name}
              </h3>
              <p style={{
                margin: 0,
                color: '#6b7280',
                lineHeight: '1.6',
                fontSize: '0.95em'
              }}>
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Demo Panel */}
        {selectedTool && (
          <div style={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
              gap: '20px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: selectedTool.gradient,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5em',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
              }}>
                {selectedTool.icon}
              </div>
              <div>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '2em', color: '#1f2937' }}>
                  {selectedTool.name}
                </h2>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '1.1em' }}>
                  {selectedTool.description}
                </p>
              </div>
            </div>

            <div style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '20px'
            }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '12px',
                fontSize: '1.1em',
                color: '#374151'
              }}>
                Enter Your Text:
              </label>
              <textarea
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder="Paste your text here or describe what you need help with..."
                style={{
                  width: '100%',
                  minHeight: '150px',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1.05em',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <button
              onClick={handleDemoRun}
              disabled={isProcessing || !demoInput.trim()}
              style={{
                padding: '16px 40px',
                background: isProcessing || !demoInput.trim() 
                  ? '#d1d5db' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.2em',
                fontWeight: '700',
                cursor: isProcessing || !demoInput.trim() ? 'not-allowed' : 'pointer',
                boxShadow: isProcessing || !demoInput.trim() 
                  ? 'none' 
                  : '0 4px 20px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
            >
              {isProcessing ? '⏳ Processing with AI...' : `🚀 Run ${selectedTool.name}`}
            </button>

            {demoOutput && (
              <div style={{
                marginTop: '30px',
                padding: '30px',
                background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)',
                borderRadius: '12px',
                border: '2px solid #e0e7ff',
                animation: 'slideUp 0.4s ease'
              }}>
                <h3 style={{
                  margin: '0 0 20px 0',
                  fontSize: '1.4em',
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>✨</span> AI Results
                </h3>
                <div style={{
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.8',
                  fontSize: '1.05em',
                  color: '#374151'
                }}>
                  {demoOutput}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Stats */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          color: '#fff'
        }}>
          <p style={{
            fontSize: '1.2em',
            opacity: 0.9,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            All AI tools are designed to enhance your creativity, not replace it. 
            Your unique voice and vision remain at the heart of every story.
          </p>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function StatBadge({ icon, number, label }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '15px 25px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <span style={{ fontSize: '1.8em' }}>{icon}</span>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '1.5em', fontWeight: '700' }}>{number}</div>
        <div style={{ fontSize: '0.9em', opacity: 0.9 }}>{label}</div>
      </div>
    </div>
  );
}

import './AIToolShell.css'

export default function AIToolShell({
  icon = '🤖',
  title,
  description,
  badge,
  controls,
  loading = false,
  loadingText = 'AI is thinking…',
  error,
  output,
  outputLabel = 'AI Output',
  emptyIcon = '✨',
  emptyTitle = 'Ready to generate',
  emptyHint = 'Configure your options above and click Generate.',
  onGenerate,
  onRegenerate,
  onClear,
  generateLabel = 'Generate',
  regenerateLabel = 'Regenerate',
  extraActions,
  children,
}) {
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output)
  }

  function handleSave() {
    if (!output) return
    const blob = new Blob([output], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = Object.assign(document.createElement('a'), {
      href: url,
      download: `${title?.replace(/\s+/g, '-').toLowerCase() ?? 'ai-output'}.txt`,
    })
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="ai-shell">
      {/* Header */}
      <div className="ai-shell__header">
        <div className="ai-shell__header-left">
          <span className="ai-shell__icon" aria-hidden="true">{icon}</span>
          <div className="ai-shell__title-group">
            <h2 className="ai-shell__title">{title}</h2>
            {description && <p className="ai-shell__description">{description}</p>}
          </div>
        </div>
        {badge && <span className="ai-shell__badge">✦ {badge}</span>}
      </div>

      {/* Optional controls row */}
      {controls && <div className="ai-shell__controls">{controls}</div>}

      {/* Content */}
      <div className="ai-shell__content">
        {children}

        {loading && (
          <div className="ai-shell__loading fade-in">
            <div className="ai-shell__spinner" aria-hidden="true" />
            <p className="ai-shell__loading-text">{loadingText}</p>
          </div>
        )}

        {!loading && error && (
          <div className="ai-shell__error fade-in" role="alert">
            <span className="ai-shell__error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && !output && (
          <div className="ai-shell__empty">
            <span className="ai-shell__empty-icon">{emptyIcon}</span>
            <p className="ai-shell__empty-title">{emptyTitle}</p>
            <p className="ai-shell__empty-hint">{emptyHint}</p>
          </div>
        )}

        {!loading && !error && output && (
          <div className="ai-output fade-in">
            <div className="ai-output__header">
              <span className="ai-output__label">{outputLabel}</span>
              <div className="ai-output__actions">
                <button className="btn btn--ghost btn--sm" onClick={handleCopy} title="Copy to clipboard">
                  📋 Copy
                </button>
                <button className="btn btn--ghost btn--sm" onClick={handleSave} title="Save as .txt">
                  💾 Save
                </button>
              </div>
            </div>
            <div className="ai-output__body">{output}</div>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="ai-shell__toolbar">
        <div className="ai-shell__toolbar-group">
          {onGenerate && (
            <button
              className="btn btn--primary"
              onClick={onGenerate}
              disabled={loading}
            >
              {loading
                ? <><span className="btn__spinner" /><span>Generating…</span></>
                : <><span>⚡</span><span>{generateLabel}</span></>
              }
            </button>
          )}
          {onRegenerate && output && (
            <button
              className="btn btn--secondary"
              onClick={onRegenerate}
              disabled={loading}
              title="Generate again"
            >
              🔄 {regenerateLabel}
            </button>
          )}
        </div>

        {(onClear || extraActions) && (
          <>
            <div className="ai-shell__toolbar-divider" aria-hidden="true" />
            <div className="ai-shell__toolbar-group">
              {extraActions}
              {onClear && output && (
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={onClear}
                  title="Clear output"
                >
                  🗑 Clear
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

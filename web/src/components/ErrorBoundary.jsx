import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: "linear-gradient(120deg,#fef3f3,#fee9e9)",
          minHeight: "100vh",
          padding: "40px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            maxWidth: 600,
            background: "#fff",
            borderRadius: 16,
            padding: 40,
            boxShadow: "0 8px 32px rgba(220,38,38,0.15)",
            border: "3px solid #dc2626"
          }}>
            <div style={{
              fontSize: "4em",
              textAlign: "center",
              marginBottom: 20
            }}>
              ⚠️
            </div>
            <h1 style={{
              margin: "0 0 16px 0",
              color: "#dc2626",
              textAlign: "center"
            }}>
              Oops! Something went wrong
            </h1>
            <p style={{
              fontSize: "1.1em",
              color: "#6b7280",
              textAlign: "center",
              marginBottom: 24
            }}>
              This component encountered an error. Don't worry, your other work is safe.
            </p>
            
            {this.state.error && (
              <details style={{
                background: "#f9fafb",
                padding: 16,
                borderRadius: 8,
                marginBottom: 20,
                border: "1px solid #e5e7eb"
              }}>
                <summary style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "#4b5563",
                  marginBottom: 8
                }}>
                  Error Details (for developers)
                </summary>
                <pre style={{
                  fontSize: "0.85em",
                  color: "#dc2626",
                  overflow: "auto",
                  margin: 0
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div style={{
              display: "flex",
              gap: 12,
              justifyContent: "center"
            }}>
              <button
                onClick={() => window.location.href = "/#/dashboard"}
                style={{
                  background: "#4c1d95",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontSize: "1em",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "#6b7280",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontSize: "1em",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

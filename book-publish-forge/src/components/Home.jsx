import React from "react";

export default function Home() {
  return (
    <div style={{
      background: "linear-gradient(120deg,#f3ecfa,#e9e3f2 60%,#fbeeff)",
      minHeight: "100vh",
      padding: "0",
      margin: 0
    }}>
      <div style={{
        maxWidth: 650, margin: "0 auto", padding: "54px 24px 42px 24px", borderRadius: 20, boxShadow: "0 8px 40px #a68eb81e", background: "#fff", marginTop: 80
      }}>
        <div style={{display: "flex", alignItems: "center", gap: 18, marginBottom: 22}}>
          <img
            src="https://emojicdn.elk.sh/📚?style=apple"
            alt="Book Forge"
            style={{width:48, height:48, filter: "drop-shadow(1px 3px 8px #be79ef2d)"}}
          />
          <div>
            <h1 style={{margin: 0, fontSize: "2.7em", letterSpacing:0.5}}>Book Publish AI & Erotic Forge</h1>
            <div style={{color:"#6e3793", fontWeight: 500}}>Unleash creativity, ethics, and consent-first publishing</div>
          </div>
        </div>
        <p style={{fontSize: "1.18em", color: "#473363", marginBottom: 19}}>
          A modular suite for writers, publishers, and all creative spirits — instantly analyze, naughtify, cleanse, audit, or ethically empower any story.<br/>
          Choose your journey:
        </p>
        <div style={{display: "flex", gap: 28, marginTop: 28, justifyContent: "center"}}>
          <a href="#/book" style={{
            textDecoration: "none", background: "#2b68ac", color: "#fff", padding: "22px 34px", borderRadius: "14px",
            fontSize: "1.25em", fontWeight: 600, boxShadow: "0 4px 20px #bee7ff50", transition: "background .2s"
          }}>📖 Book Forge</a>
          <a href="#/erotic" style={{
            textDecoration: "none", background: "linear-gradient(90deg,#ff34a3,#9c35b0 80%)", color: "#fff", padding: "22px 34px", borderRadius: "14px",
            fontSize: "1.25em", fontWeight: 600, boxShadow: "0 4px 20px #ffcaf650", transition: "background .2s"
          }}>🔥 Erotic Forge</a>
        </div>
        <div style={{marginTop:38, fontSize: "1.02em", color:"#555379"}}>
          <b>Respect. Empowerment. Transparency.</b> <br/>
          Every creation is <span style={{color:"#34ad81", fontWeight:500}}>audit-safe</span> and <span style={{color:"#b9357f", fontWeight:500}}>consent-powered</span>.
        </div>
      </div>
    </div>
  );
}
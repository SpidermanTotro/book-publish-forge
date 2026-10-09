import React, { useState, useRef } from "react";

/**
 * Simple peer-chat for writing sessions; for voice, pair with simple-peer/WebRTC
 * - roomId: unique string (projectId or writing room ID)
 * - user: { id, name, avatar }
 */
export default function WritingRoomChatPanel({ roomId, user }) {
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState("");
  const chatRef = useRef();

  // Mock: Replace with websocket or presence API in prod!
  function send(msg) {
    setMsgs(ms => [...ms, { user, text: msg, time: new Date().toLocaleTimeString() }]);
    setMsg("");
  }

  return (
    <div style={{
      background: "#f5faff", border: "1.2px solid #89cee6", borderRadius: 12,
      padding: 14, maxWidth: 430, margin: "0 0 18px 0"
    }}>
      <div style={{fontWeight:650,marginBottom:8}}>Writing Room: {roomId}</div>
      <div style={{maxHeight:150,overflowY:"auto",background:"#fff",borderRadius:7,padding:9}}
        ref={chatRef}>
        {msgs.length === 0 ? <i>No messages yet.</i> :
          msgs.map((m,i)=>(
            <div key={i} style={{marginBottom:7}}>
              <b>{m.user.name}</b> <span style={{color:"#789", fontSize:"0.92em"}}>{m.time}</span>
              <br/>{m.text}
            </div>
          ))
        }
      </div>
      <form style={{marginTop:9,display:"flex"}} onSubmit={e=>{e.preventDefault();if(msg)send(msg);}}>
        <input value={msg} autoFocus style={{flex:1,marginRight:8,borderRadius:8,padding:"8px"}} onChange={e=>setMsg(e.target.value)}/>
        <button style={{padding:"6px 15px"}} disabled={!msg}>Send</button>
      </form>
    </div>
  );
}
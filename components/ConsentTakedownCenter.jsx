import React, { useState } from "react";

// Mock data for demo
const initialRequests = [
  { id: 1, type: "takedown", subject: "Jane Doe", story: "The Green Dream", status: "Pending", time: new Date() },
  { id: 2, type: "withdraw consent", subject: "Alex Zhang", story: "Stars in Brooklyn", status: "Approved", time: new Date(Date.now() - 2*24*60*60*1000) }
];

export default function ConsentTakedownCenter() {
  const [requests, setRequests] = useState(initialRequests);
  const [submitting, setSubmitting] = useState(false);
  const [subject, setSubject] = useState("");
  const [story, setStory] = useState("");
  const [type, setType] = useState("takedown");
  const [message, setMessage] = useState("");

  function submitRequest(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setRequests(prev => [
        ...prev,
        {
          id: prev.length+1, type, subject, story,
          status: "Pending", time: new Date()
        }
      ]);
      setMessage("Your request has been submitted for review. You’ll be notified when processed.");
      setSubject(""); setStory(""); setType("takedown");
      setSubmitting(false);
    }, 1500);
  }

  return (
    <div style={{background:"#f2f9f6", borderRadius:10, padding:30, maxWidth:800, margin:"34px auto"}}>
      <h2>Consent & Takedown Control Center</h2>
      <p>
        If you are a contributor or subject in any published work, you can <b>withdraw consent</b> or request a <b>takedown</b> here.<br/>
        Our team reviews all requests promptly to ensure respect and safety.
      </p>
      <form onSubmit={submitRequest} style={{margin:"22px 0"}}>
        <div>
          <label><b>Action:</b>{" "}
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option value="takedown">Request Takedown</option>
              <option value="withdraw consent">Withdraw Consent</option>
            </select>
          </label>
        </div>
        <div style={{marginTop:10}}>
          <label><b>Your Name:</b>{" "}
            <input required value={subject} onChange={e=>setSubject(e.target.value)} disabled={submitting}/>
          </label>
        </div>
        <div style={{marginTop:10}}>
          <label><b>Story/Book Title:</b>{" "}
            <input required value={story} onChange={e=>setStory(e.target.value)} disabled={submitting}/>
          </label>
        </div>
        <button
          type="submit"
          disabled={submitting || !subject || !story}
          style={{marginTop:13, background:"#1e7f57", color:"#fff", border:"none", borderRadius:6, padding:"7px 21px", fontWeight:700}}>
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
      {message && <div style={{marginTop:10, color:"#13754f", fontWeight:600}}>{message}</div>}
      <hr style={{margin:"24px 0"}}/>
      <h3>My Requests Log</h3>
      <table style={{width:"100%", background:"#fff", borderRadius:6}}>
        <thead>
          <tr style={{background:"#e0ebe6"}}>
            <th>Time</th>
            <th>Action</th>
            <th>Subject</th>
            <th>Story</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r=>
            <tr key={r.id}>
              <td>{r.time.toLocaleString()}</td>
              <td>{r.type}</td>
              <td>{r.subject}</td>
              <td>{r.story}</td>
              <td>
                <span style={{
                  color: r.status==="Approved"?"#157d4b": (r.status==="Rejected"? "#b6002b":"#665a02"),
                  fontWeight:"bold"
                }}>{r.status}</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
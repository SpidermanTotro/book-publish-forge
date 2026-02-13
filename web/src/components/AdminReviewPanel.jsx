import React, { useState } from "react";

// Demo/mock data
const initial = [
  { id:1, type: "takedown", subject: "Jane Doe", story: "The Green Dream", reason: "Privacy", status:"Pending", mode: "erotic", time: new Date(), requestor: "Jane Doe" },
  { id:2, type: "withdraw", subject: "Alex Zhang", story: "Stars in Brooklyn", reason: "Withdraw consent", status:"Pending", mode: "main", time: new Date(), requestor: "Alex Zhang" }
];

export default function AdminReviewPanel() {
  const [requests, setRequests] = useState(initial);

  function actOnRequest(id, newStatus) {
    setRequests(reqs =>
      reqs.map(r =>
        r.id === id ? { ...r, status: newStatus, resolvedAt: new Date() } : r
      )
    );
  }

  return (
    <div style={{background: "#f7faf6", borderRadius: 9, padding: 22, maxWidth: 890, margin: "28px auto"}}>
      <h2>Admin Review Panel</h2>
      <table style={{width:"100%", background:"#fff", borderRadius:8, fontSize:".99em"}}>
        <thead>
          <tr style={{background:"#eef", color:"#023"}}>
            <th>Time</th>
            <th>Type</th>
            <th>Subject</th>
            <th>Story</th>
            <th>Reason</th>
            <th>Mode</th>
            <th>Requestor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {requests.map(r=>(
          <tr key={r.id}>
            <td>{r.time.toLocaleString()}</td>
            <td>{r.type}</td>
            <td>{r.subject}</td>
            <td>{r.story}</td>
            <td>{r.reason}</td>
            <td>
              <span style={{
                color: r.mode==="erotic"?"#b00575":"#205ba8",
                fontWeight:700
              }}>{r.mode==="erotic"?"Erotic Forge":"Book Forge"}</span>
            </td>
            <td>{r.requestor}</td>
            <td>{r.status}</td>
            <td>
              {r.status==="Pending" ? (
                <>
                  <button style={{background:"#1fa663",color:"#fff",border:"none",borderRadius:5,padding:"5px 11px",marginRight:6}}
                    onClick={()=>actOnRequest(r.id,"Approved")}>Approve</button>
                  <button style={{background:"#be2d4e",color:"#fff",border:"none",borderRadius:5,padding:"5px 11px"}}
                    onClick={()=>actOnRequest(r.id,"Rejected")}>Reject</button>
                </>
              ) : (
                <span style={{color: r.status==="Approved"?"#14803e":"#a30029"}}>{r.status}</span>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
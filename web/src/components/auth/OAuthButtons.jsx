import React from "react";
import { useAuth } from "./AuthProvider";
export default function OAuthButtons() {
  const { oauth } = useAuth();
  return (
    <div>
      <button onClick={()=>oauth("google")}>Sign in with Google</button>
      <button onClick={()=>oauth("github")}>Sign in with GitHub</button>
    </div>
  );
}
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  // In production, use your own API for these calls!
  async function login({email, password}) { /* ... */ }
  async function logout() { setUser(null); }
  async function signup({email, password, name}) { /* ... */ }
  async function oauth(provider) { /* ... (Google, GitHub, etc) */ }
  return (
    <AuthContext.Provider value={{user, login, logout, signup, oauth}}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() { return useContext(AuthContext); }
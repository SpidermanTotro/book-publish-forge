import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MasterForgeModule from "./components/MasterForgeModule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<MasterForgeModule />} />
        <Route path="/erotic" element={<MasterForgeModule />} />
      </Routes>
    </Router>
  );
}

export default App;

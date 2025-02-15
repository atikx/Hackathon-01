import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "./Pages/Login";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/chat" element={<Sidebar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;

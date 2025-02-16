import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "./Pages/Login";
import { QueryClientProvider, QueryClient } from "react-query";
import Landing from "./Pages/Landing";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <div className="h-screen w-screen overflow-hidden">
              <Route path="/chat" element={<Sidebar />} />
              <Route path="/login" element={<Login />} />
            </div>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}
export default App;

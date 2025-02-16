import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "./Pages/Login";
import { QueryClientProvider, QueryClient } from "react-query";
import Landing from "./Pages/Landing";
import SpecificChat from "../components/SpecificChat";
import NotFound from "./Pages/NotFound";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/newchat" element={<Sidebar />} />
            <Route path="/chat/:id" element={<SpecificChat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}
export default App;

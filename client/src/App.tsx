import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import ContactsPage from "./pages/ContactsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function App() {
  const ctx = useContext(AuthContext);

  if (ctx?.loading) return <div className="text-2xl text-white font-bold">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC LANDING */}
        <Route path="/" element={<LandingPage />} />

        {/* PUBLIC DEMO MODE (NO AUTH) */}
        <Route path="/demo" element={<ContactsPage demoMode={true} />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED CONTACTS PAGE */}
        <Route
          path="/app"
          element={
            ctx?.user ? <ContactsPage /> : <Navigate to="/login" replace />
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

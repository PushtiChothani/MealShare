import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Home from "./pages/home/Home";
import Meals from "./pages/Meals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function AppContent() {
  const location = useLocation();

  // Landing page should NOT have Navbar
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Navbar />}

      <Routes>
        {/* 1. Animated Landing Page - NO NAVBAR */}
        <Route path="/" element={<Landing />} />

        {/* 2. Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Other pages */}
        <Route path="/meals" element={<Meals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Home from "./pages/home/Home";
import Meals from "./pages/Meals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReserverDashboard from "./pages/ReserverDashboard/ReserverDashboard";
import FoodListerDashboard from "./pages/FoodListerDashboard/FoodListerDashboard";
import CreateListing from "./pages/CreateListing/CreateListing";
import ManageListings from "./pages/ManageListings/ManageListings";
import Reservations from "./pages/Reservations/Reservations";
import PartnerProfile from "./pages/PartnerProfile/PartnerProfile";
import PartnerSettings from "./pages/PartnerSettings/PartnerSettings";

function AppContent() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Navbar />}

      <Routes>
        {/* Landing Page - NO NAVBAR */}
        <Route path="/" element={<Landing />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Core pages */}
        <Route path="/meals" element={<Meals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard pages */}
        <Route path="/reserver-dashboard" element={<ReserverDashboard />} />
        <Route path="/food-lister-dashboard" element={<FoodListerDashboard />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/manage-listings" element={<ManageListings />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/partner-profile" element={<PartnerProfile />} />
        <Route path="/partner-settings" element={<PartnerSettings />} />
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

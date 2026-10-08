import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import About from "./pages/About/About";
import CreateListing from "./pages/CreateListing/CreateListing";
import FoodListerDashboard from "./pages/FoodListerDashboard/FoodListerDashboard";
import Landing from "./pages/Landing";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import ManageListings from "./pages/ManageListings/ManageListings";
import Meals from "./pages/Meals";
import PartnerProfile from "./pages/PartnerProfile/PartnerProfile";
import PartnerSettings from "./pages/PartnerSettings/PartnerSettings";
import Reservations from "./pages/Reservations/Reservations";
import ReserverDashboard from "./pages/ReserverDashboard/ReserverDashboard";
import Signup from "./pages/Signup";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/reserver-dashboard"
          element={
            <ProtectedRoute allowedRole="reserver">
              <ReserverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-lister-dashboard"
          element={
            <ProtectedRoute allowedRole="food-lister">
              <FoodListerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-listing"
          element={
            <ProtectedRoute allowedRole="food-lister">
              <CreateListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-listings"
          element={
            <ProtectedRoute allowedRole="food-lister">
              <ManageListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute allowedRole="food-lister">
              <Reservations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner-profile"
          element={
            <ProtectedRoute allowedRole="food-lister">
              <PartnerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner-settings"
          element={
            <ProtectedRoute allowedRole="food-lister">
              <PartnerSettings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

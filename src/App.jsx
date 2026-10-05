import {

  BrowserRouter,

  Routes,

  Route,

  NavLink,

  useNavigate,

} from "react-router-dom";

import Home from "./pages/Home/Home";

import ReserverDashboard from "./pages/ReserverDashboard/ReserverDashboard";

import FoodListerDashboard from "./pages/FoodListerDashboard/FoodListerDashboard";

import CreateListing from "./pages/CreateListing/CreateListing";

import ManageListings from "./pages/ManageListings/ManageListings";

import Reservations from "./pages/Reservations/Reservations";

import PartnerProfile from "./pages/PartnerProfile/PartnerProfile";

import PartnerSettings from "./pages/PartnerSettings/PartnerSettings";

import Meals from "./pages/Meals";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

function AppLayout() {

  const navigate = useNavigate();

  return (

    <>

      {/* =====================================================

          GLOBAL NAVBAR

          Top navigation only — no sidebar

      ===================================================== */}

      <style>{`

        .mealshare-global-navbar {

          position: relative !important;

          z-index: 99999 !important;

          width: 100% !important;

          height: 72px !important;

          margin: 0 !important;

          padding: 0 !important;

          background: #f7f1e8 !important;

          border-bottom: 1px solid rgba(81, 32, 42, 0.08) !important;

          box-sizing: border-box !important;

        }

        .mealshare-global-navbar * {

          box-sizing: border-box !important;

        }

        .mealshare-navbar-container {

          width: calc(100% - 80px) !important;

          height: 72px !important;

          margin: 0 auto !important;

          padding: 0 !important;

          display: flex !important;

          align-items: center !important;

          justify-content: space-between !important;

        }

        .mealshare-navbar-logo {

          flex: 0 0 auto !important;

          display: flex !important;

          align-items: center !important;

          gap: 8px !important;

          margin: 0 !important;

          padding: 0 !important;

          border: 0 !important;

          background: transparent !important;

          color: #51202a !important;

          font-family: Georgia, "Times New Roman", serif !important;

          font-size: 25px !important;

          font-weight: 700 !important;

          line-height: 1 !important;

          cursor: pointer !important;

          white-space: nowrap !important;

        }

        .mealshare-navbar-logo-mark {

          color: #ef5361 !important;

          font-family: Arial, Helvetica, sans-serif !important;

          font-size: 31px !important;

          line-height: 1 !important;

          transform: rotate(-25deg) !important;

        }

        .mealshare-navbar-right {

          flex: 0 0 auto !important;

          width: auto !important;

          margin: 0 0 0 auto !important;

          padding: 0 !important;

          display: flex !important;

          align-items: center !important;

          justify-content: flex-end !important;

          gap: 30px !important;

        }

        .mealshare-navbar-links {

          flex: 0 0 auto !important;

          width: auto !important;

          margin: 0 !important;

          padding: 0 !important;

          display: flex !important;

          align-items: center !important;

          justify-content: flex-end !important;

          gap: 28px !important;

        }

        .mealshare-navbar-link {

          flex: 0 0 auto !important;

          display: inline-flex !important;

          align-items: center !important;

          height: 40px !important;

          margin: 0 !important;

          padding: 0 !important;

          color: #51202a !important;

          font-family: Arial, Helvetica, sans-serif !important;

          font-size: 14px !important;

          font-weight: 600 !important;

          line-height: 1 !important;

          text-decoration: none !important;

          white-space: nowrap !important;

        }

        .mealshare-navbar-link:hover,

        .mealshare-navbar-link.active {

          color: #7d1f2a !important;

        }

        .mealshare-navbar-actions {

          flex: 0 0 auto !important;

          width: auto !important;

          margin: 0 !important;

          padding: 0 !important;

          display: flex !important;

          align-items: center !important;

          justify-content: flex-end !important;

          gap: 10px !important;

        }

        .mealshare-navbar-button {

          flex: 0 0 auto !important;

          height: 40px !important;

          margin: 0 !important;

          padding: 0 18px !important;

          border-radius: 999px !important;

          font-family: Arial, Helvetica, sans-serif !important;

          font-size: 14px !important;

          font-weight: 700 !important;

          line-height: 1 !important;

          white-space: nowrap !important;

          cursor: pointer !important;

        }

        .mealshare-navbar-login,
        .mealshare-navbar-signup {

          border: 1px solid rgba(81, 32, 42, 0.2) !important;

          background: transparent !important;

          color: #51202a !important;

        }

        .mealshare-navbar-login:hover,
        .mealshare-navbar-signup:hover {

          background: rgba(125, 31, 42, 0.05) !important;

        }

        .mealshare-navbar-dashboard {

          min-width: 125px !important;

          border: 1px solid #7d1f2a !important;

          background: #7d1f2a !important;

          color: #ffffff !important;

        }

        .mealshare-navbar-dashboard:hover {

          background: #641722 !important;

          border-color: #641722 !important;

        }

        @media (max-width: 1200px) {

          .mealshare-navbar-right {

            gap: 16px !important;

          }

          .mealshare-navbar-links {

            gap: 18px !important;

          }

          .mealshare-navbar-button {

            padding: 0 13px !important;

            font-size: 13px !important;

          }

        }

        @media (max-width: 900px) {

          .mealshare-navbar-container {

            width: calc(100% - 40px) !important;

          }

          .mealshare-navbar-right {

            gap: 12px !important;

          }

          .mealshare-navbar-links {

            gap: 14px !important;

          }

          .mealshare-navbar-button {

            padding: 0 11px !important;

          }

        }

        @media (max-width: 760px) {

          .mealshare-navbar-links {

            display: none !important;

          }

          .mealshare-navbar-container {

            width: calc(100% - 24px) !important;

          }

        }

      `}</style>

      <header className="mealshare-global-navbar">

        <div className="mealshare-navbar-container">

          {/* LOGO */}

          <button

            type="button"

            className="mealshare-navbar-logo"

            onClick={() => navigate("/")}

          >

            <span className="mealshare-navbar-logo-mark">

              ⌁

            </span>

            <span>

              MealShare

            </span>

          </button>

          {/* RIGHT SIDE */}

          <nav className="mealshare-navbar-right">

            <div className="mealshare-navbar-links">

              <NavLink

                to="/"

                className={({ isActive }) =>

                  `mealshare-navbar-link ${

                    isActive ? "active" : ""

                  }`

                }

              >

                Home

              </NavLink>

              <NavLink

                to="/meals"

                className={({ isActive }) =>

                  `mealshare-navbar-link ${

                    isActive ? "active" : ""

                  }`

                }

              >

                Meals

              </NavLink>

              <NavLink

                to="/about"

                className={({ isActive }) =>

                  `mealshare-navbar-link ${

                    isActive ? "active" : ""

                  }`

                }

              >

                About Us

              </NavLink>

            </div>

            <div className="mealshare-navbar-actions">

{/* Login */}

              <button

                type="button"

                className="mealshare-navbar-button mealshare-navbar-login"

                onClick={() => navigate("/login")}

              >

                Login

              </button>

              {/* Sign Up */}

              <button

                type="button"

                className="mealshare-navbar-button mealshare-navbar-signup"

                onClick={() => navigate("/signup")}

              >

                Sign Up

              </button>

              {/* Dashboard */}

              <button

                type="button"

                className="mealshare-navbar-button mealshare-navbar-dashboard"

                onClick={() =>

                  navigate("/food-lister-dashboard")

                }

              >

                Dashboard

              </button>

            </div>

          </nav>

        </div>

      </header>

      {/* =====================================================

          PAGE ROUTES

      ===================================================== */}

      <Routes>

        {/* Home */}

        <Route

          path="/"

          element={<Home />}

        />

        {/* Reserver Dashboard */}

        <Route

          path="/reserver-dashboard"

          element={<ReserverDashboard />}

        />

        {/* Food Lister Dashboard */}

        <Route

          path="/food-lister-dashboard"

          element={<FoodListerDashboard />}

        />

        {/* Create Listing */}

        <Route

          path="/create-listing"

          element={<CreateListing />}

        />

        {/* Manage Listings */}

        <Route

          path="/manage-listings"

          element={<ManageListings />}

        />

        {/* Reservations */}

        <Route

          path="/reservations"

          element={<Reservations />}

        />

        {/* Partner Profile */}

        <Route

          path="/partner-profile"

          element={<PartnerProfile />}

        />

        {/* Partner Settings */}

        <Route

          path="/partner-settings"

          element={<PartnerSettings />}

        />

        {/* Meals */}

        <Route

          path="/meals"

          element={<Meals />}

        />

        {/* Login */}

        <Route

          path="/login"

          element={<Login />}

        />

        {/* Signup */}

        <Route

          path="/signup"

          element={<Signup />}

        />

      </Routes>

    </>

  );

}

function App() {

  return (

    <BrowserRouter>

      <AppLayout />

    </BrowserRouter>

  );

}

export default App;

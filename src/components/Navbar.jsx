import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${
        location.pathname === "/meals" ? "navbar-meals" : ""
      }`}
    >
      <div className="navbar-container">

        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 3.5C11.5 3.8 5.5 7.5 4 14.5C3.5 17 4 19.5 5 21
                C6.5 19 8 17.5 10 16.5C13.5 14.5 16 11.5 17.5 8.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 20C8 19 10.5 17.5 12.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span>MealShare</span>
        </NavLink>


        {/* Navigation */}
        <nav className="navbar-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/meals"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Meals
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About Us
          </NavLink>

        </nav>


        {/* Actions */}
        <div className="navbar-actions">

          <NavLink to="/login" className="nav-button login-button">
            Login
          </NavLink>

          <NavLink to="/signup" className="nav-button signup-button">
            Sign Up
          </NavLink>

          <NavLink to="/dashboard" className="dashboard-button">
            Dashboard
          </NavLink>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
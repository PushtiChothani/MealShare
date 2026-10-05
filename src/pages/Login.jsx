import React, { useState } from "react";
import LoginFormInputs from "./home/components/LoginFormInputs";
import LoginButton from "./home/components/LoginButton";
import SignUpLink from "./home/components/SignUpLink";
import "./home/login.css";

function Login() {
  const [role, setRole] = useState("donors");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const roleTitle = role === "donors" ? "Donor" : "Receiver";
    console.log(`[MealShare] Login attempt as ${roleTitle}:`, { username, password });
    alert(`Attempting to log in as ${roleTitle} (${username || "No input provided"})`);
  };

  return (
    <div className="login-page-container">
      <div className="login-card">

        {/* LEFT SECTION — LOGIN FORM */}
        <div className="login-left-section">

          {/* PAGE TITLE */}
          <h1 className="login-page-title">Login</h1>

          {/* ROLE SELECTION TABS */}
          <div className="role-tabs-wrapper">
            <div className="role-tabs">
              <button
                type="button"
                className={`role-tab-btn ${role === "donors" ? "active" : ""}`}
                onClick={() => setRole("donors")}
              >
                Donors
              </button>
              <button
                type="button"
                className={`role-tab-btn ${role === "receivers" ? "active" : ""}`}
                onClick={() => setRole("receivers")}
              >
                Receivers
              </button>
            </div>
            <p className="role-description">
              {role === "donors"
                ? "For restaurants, hotels, bakeries, hostel messes, cafeterias and other food providers who list surplus food."
                : "For NGOs, charitable organizations and authorized people who reserve surplus food for distribution."}
            </p>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLoginSubmit}>
            {/* Component 1: username, email and password */}
            <LoginFormInputs
              role={role}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />

            {/* Component 2: Login button */}
            <LoginButton role={role} />

            {/* Component 3: Don't have an account? Sign up button */}
            <SignUpLink />
          </form>

        </div>


        {/* RIGHT SECTION — IMAGE WITH DIAGONAL CLIP + RED OVERLAY */}
        <div className="login-right-section">
          <img
            src={
              role === "donors"
                ? "/image/login-donor.jpeg"
                : "/image/login-receiver.jpeg"
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/image/login-food.png";
            }}
            alt={role === "donors" ? "Surplus food donation donor" : "Meal sharing receiver group"}
            className="right-section-bg"
          />
          <div className="right-section-overlay" />
        </div>

      </div>
    </div>
  );
}

export default Login;

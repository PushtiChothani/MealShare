import React, { useState } from "react";
import "./home/Signup.css";

function Signup() {
    const [role, setRole] = useState("donor");

    return (
        <div className="signup-page">
            <div className="signup-container">

                {/* LEFT IMAGE SECTION */}
                <div className="signup-image-section">
                    <img
                        src={role === "donor" ? "/image/donor-signup.png" : "/image/receiver-signup.jpeg"}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/image/login-food.png";
                        }}
                        alt={role === "donor" ? "Donor" : "Receiver"}
                        className={`signup-role-image ${role === "donor" ? "donor-image" : "receiver-image"}`}
                    />
                    <div className="signup-image-overlay" />
                </div>

                {/* MIDDLE FORM SECTION */}
                <div className="signup-form-section">

                    <h1>Sign Up</h1>
                    <p className="signup-subtitle">Create your MealShare account</p>

                    {/* ROLE SELECTOR */}
                    <div className="signup-role-selector">
                        <button
                            type="button"
                            className={role === "donor" ? "active-role" : ""}
                            onClick={() => setRole("donor")}
                        >
                            Donor
                        </button>
                        <button
                            type="button"
                            className={role === "receiver" ? "active-role" : ""}
                            onClick={() => setRole("receiver")}
                        >
                            Receiver
                        </button>
                    </div>

                    {/* SIGN UP FORM */}
                    <form className="signup-form">
                        <div className="signup-input-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" required />
                        </div>

                        <div className="signup-input-group">
                            <label>Username</label>
                            <input type="text" placeholder="Enter your username" required />
                        </div>

                        <div className="signup-input-group">
                            <label>Phone Number</label>
                            <input type="tel" placeholder="Enter your phone number" required />
                        </div>

                        <div className="signup-input-group">
                            <label>Password</label>
                            <input type="password" placeholder="Create a password" required />
                        </div>

                        <div className="signup-input-group">
                            <label>Address</label>
                            <input type="text" placeholder="Enter your address" required />
                        </div>

                        <button type="submit" className="signup-button">
                            Sign Up as {role === "donor" ? "Donor" : "Receiver"}
                        </button>
                    </form>

                    <p className="already-account">
                        Already have an account?
                        <a href="/login"> Login</a>
                    </p>

                </div>

                {/* VERTICAL OR DIVIDER + GOOGLE */}
                <div className="signup-or-section">
                    {/* Left: vertical line with OR in middle */}
                    <div className="or-divider">
                        <div className="or-line" />
                        <span className="or-text">OR</span>
                        <div className="or-line" />
                    </div>

                    {/* Right: Google button */}
                    <div className="signup-social-icons">
                        <button type="button" className="social-icon-btn google-icon" aria-label="Continue with Google">
                            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.5 3.09 29.54 1 24 1 14.82 1 7.07 6.48 3.87 14.22l7.08 5.5C12.6 13.72 17.85 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.58C43.02 37.28 46.1 31.36 46.1 24.5z"/>
                                <path fill="#FBBC05" d="M10.95 28.28A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.71-4.28l-7.08-5.5A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.56 10.76l8.39-6.48z"/>
                                <path fill="#34A853" d="M24 47c5.54 0 10.19-1.84 13.58-4.97l-7.19-5.58c-1.84 1.23-4.19 1.96-6.39 1.96-6.15 0-11.4-4.22-13.05-9.93l-8.39 6.48C7.07 41.52 14.82 47 24 47z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Signup;

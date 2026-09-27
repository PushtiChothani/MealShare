import React from "react";

function LoginFormInputs({ role, username, setUsername, password, setPassword }) {
  const isDonor = role === "donors";

  const handleForgotClick = (e) => {
    e.preventDefault();
    alert("Password reset instructions have been sent to your email.");
  };

  return (
    <div className="login-form-inputs">
      <div className="form-group">
        <label htmlFor="username-email">
          {isDonor ? "Username or Email" : "Email or Username"}
        </label>
        <div className="input-wrapper">
          <input
            id="username-email"
            type="text"
            required
            placeholder={
              isDonor
                ? "Enter donor username or email"
                : "Enter receiver email or username"
            }
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="label-with-forgot">
          <label htmlFor="password">Password</label>
          <a
            href="#forgot-password"
            onClick={handleForgotClick}
            className="forgot-password-link"
          >
            Forgot Password?
          </a>
        </div>
        <div className="input-wrapper">
          <input
            id="password"
            type="password"
            required
            placeholder=". . . . . . . . . . . ."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginFormInputs;

import React from "react";
import "./LoginForm.css"; // Import the corresponding CSS file

const LoginForm = () => {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <form className="login-form">
          <h1>Login</h1>
          <div style={{marginTop: '4rem'}}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Type in username..."
            />
          </div>
          <div style={{marginTop: '2rem'}}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Type in password..."
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

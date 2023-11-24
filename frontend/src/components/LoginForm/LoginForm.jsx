import React, { useState } from "react";
import "./LoginForm.css";
import { useUserContext } from "../../contexts";

const LoginForm = () => {
  const { login, loggedIn, errorMsg, setErrorMsg } = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // THERE IS A PROBLEM HERE WITH THE LOGIN FUNCTION THAT IS ASYNC AND THE REDIRECT OF IT IS CAUSING ERRORS
  const handleSubmit = (event) => {
    event.preventDefault();
    // eventualmente aggiungere qui validation dell'input
    login(username, password).catch((err) => {
      setErrorMsg(err.detail ? err.detail : JSON.stringify(err));
    });
  };

  if (loggedIn) {
    return <div>You are already logged in!</div>;
  }
  return (
    <div className="login-page">
      <div className="login-form-container">
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <h1>Login</h1>
          <div style={{ marginTop: "4rem" }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Type in username..."
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Type in password..."
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          {errorMsg ? (
            <div className="col-5" style={{ color: "red" }}>
              Login was unsuccessful: {errorMsg}
            </div>
          ) : (
            <></>
          )}
          <button className="submit-button" onClick={(ev) => handleSubmit(ev)}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

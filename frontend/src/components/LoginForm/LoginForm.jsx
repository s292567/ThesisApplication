import React, {useState} from "react";
import "./LoginForm.css";

const LoginForm = (props) => {

  const {errorMsg, setErrorMsg} = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    // eventualmente aggiungere qui validation dell'input

    props.login(username, password)
        .catch((err) => {
          setErrorMsg(err.detail ? err.detail : JSON.stringify(err));
        })
  }
  if (props.isLoggedIn) {
    return <div>You are already logged in!</div>
  }
  return (
    <div className="login-page">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div style={{marginTop: '4rem'}}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Type in username..."
              onChange={ev=>setUsername(ev.target.value)}
            />
          </div>
          <div style={{marginTop: '2rem'}}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Type in password..."
              onChange={ev => setPassword(ev.target.value)}
            />
          </div>
          {errorMsg ? <div className="col-5" style={{color: "red"}}>Login was unsuccessful: {errorMsg}</div> : <></>}
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

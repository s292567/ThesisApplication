// userContext.jsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileApi, loginApi } from "../api";
import { frontendRoutes as routes } from "../routes";

const UserContext = createContext(undefined);

const useUserContext = () => useContext(UserContext);

// it's used to Load the user context the first time the app is loaded
const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  let userId = undefined;
  const [jwtToken, setJwtToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [homePageRoute, setHomePageRoute] = useState("/");

  useEffect(() => {
    if (jwtToken !== "") {
      localStorage.setItem("jwt", jwtToken);
    } else {
      const jwt = localStorage.getItem("jwt");
      if (jwt !== null) {
        setJwtToken(jwt);
        setLoggedIn(true);
      }
    }

    if (user !== "") {
      localStorage.setItem("username", user.username);
    } else {
      const username = localStorage.getItem("username");
      if (username !== null) {
        getProfileApi(username)
          .then((loggedUser) => {
            setUser(loggedUser);
          })
          .catch((err) => {
            setErrorMsg(err.detail);
            setJwtToken("");
            setUser("");
            setLoggedIn(false);
          });
      }
    }
  }, []);

  // Funzione di login
  const login = async (username, password) => {
    try {
      const token = await loginApi(username, password);
      setJwtToken(token);
      setLoggedIn(true);
      userId = username.split("@")[0];

      const loggedUser = await getProfileApi(username);

      setUser(loggedUser);
      navigateBasedOnRole(loggedUser);
    } catch (error) {
      setErrorMsg(error.detail);
      navigate(routes.login);
      console.log("in the error catch", error.detail);
    }
  };

  // Funzione di logout
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("jwt");
    setJwtToken("");
    setUser("");
    setLoggedIn(false);
    navigate("/");
  };

  // Funzione per navigare in base al ruolo dell'utente
  const navigateBasedOnRole = (user) => {
    if (user.role === "Student") {
      navigate(routes.studentDashboard);
    } else if (user.role === "Professor") {
      navigate(routes.professorDashboard);
    }
  };

  const contextValue = {
    user,
    userId,
    setUser,
    jwtToken,
    setJwtToken,
    loggedIn,
    setLoggedIn,
    errorMsg,
    setErrorMsg,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserProvider, useUserContext };

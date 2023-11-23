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
  const [userId, setUserId] = useState("")
  const [jwtToken, setJwtToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [homeRoute, setHomeRoute] = useState("/");
  const [generalRoutes, setGeneralRoutes] = useState({
    theses: "/",

  });
  const navigate = useNavigate();

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
            if( loggedUser.role === "Student"){
              setHomeRoute(routes.studentDashboard);
              setGeneralRoutes(prev => ({...prev, theses: routes.studentTheses}));
            }else if( loggedUser.role === "Professor"){
              setHomeRoute(routes.professorDashboard);
              setGeneralRoutes(prev => ({...prev, theses: routes.professorTheses}));
            }
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
      setUserId(username.split("@")[0]);
      localStorage.setItem("jwt", token);

      const loggedUser = await getProfileApi(username);
      setUser(loggedUser);
      localStorage.setItem("username", loggedUser.username);

      if (loggedUser.role === "Student") {
        setHomeRoute(routes.studentDashboard);
        setGeneralRoutes(prev => ({...prev, theses: routes.studentTheses}));
        navigate(routes.studentDashboard);
      } else if (loggedUser.role === "Professor") {
        setHomeRoute(routes.professorDashboard);
        setGeneralRoutes(prev => ({...prev, theses: routes.professorTheses}));
        navigate(routes.professorDashboard);
      }
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
    setHomeRoute("/");
    console.log("logout with route ", homeRoute);
    navigate("/");
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
    homeRoute,
    generalRoutes,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserProvider, useUserContext };

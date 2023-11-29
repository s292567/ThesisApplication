// userContext.jsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { frontendRoutes as routes } from "../routes";
import {AuthContext} from "react-oauth2-code-pkce";

import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent,IAuthContext } from "react-oauth2-code-pkce"

const UserContext = createContext(undefined);

const useUserContext = () => useContext(UserContext);

// it's used to Load the user context the first time the app is loaded
const UserProvider = ({ children }) => {
  const { tokenData, token, login, logOut } = useContext(AuthContext);
  const [user, setUser] = useState(undefined);
  const [userId, setUserId] = useState("")
  const [jwtToken, setJwtToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(tokenData!==undefined || loginInProgress);
  const [errorMsg, setErrorMsg] = useState("");
  const [homeRoute, setHomeRoute] = useState("/");
  const logout=logOut;
  const [generalRoutes, setGeneralRoutes] = useState({
    theses: "/",

  });

  useEffect(() => {
    if (!user && tokenData) {
      let role;
      if( tokenData.realm_access.roles.includes("Student"))
        role = "Student";
      else if(tokenData.realm_access.roles.includes("Professor"))
        role = "Professor";
      setUser({ username: tokenData.preferred_username, role: role , name: tokenData.firstName, surname: tokenData.lastName, token: token });
      setLoggedIn(true);
      if(role === "Student"){
        setHomeRoute(routes.studentDashboard);
        setGeneralRoutes(prev => ({...prev, theses: routes.studentTheses}));
      }else if(role === "Professor"){
        setHomeRoute(routes.professorDashboard);
        setGeneralRoutes(prev => ({...prev, theses: routes.professorTheses}));
      }
      setJwtToken(token);
      setUserId(tokenData.preferred_username.split("@")[0]);
      localStorage.setItem("username", tokenData.preferred_username.split("@")[0]);

    }  }, [tokenData]);


  // Funzione di login
  /*const login = async (username, password) => {
    try {
      const token = await loginApi(username, password);
      setJwtToken(token);
      const loggedUser = tokenData
      setUser({username:loggedUser.preferred_username,role:loggedUser.realm_access.roles[3]});
      localStorage.setItem("jwt", token);
      localStorage.setItem("username", loggedUser.preferred_username);
      if (loggedUser.role === "Student") {
        setHomeRoute(routes.studentDashboard);
        setGeneralRoutes(prev => ({...prev, theses: routes.studentTheses}));
        navigate(routes.studentDashboard);
      } else if (loggedUser.role === "Professor") {
        setHomeRoute(routes.professorDashboard);
        setGeneralRoutes(prev => ({...prev, theses: routes.professorTheses}));
        navigate(routes.professorDashboard);
      }
    } else {
      setJwtToken("");
      setUser("");

      setErrorMsg(error);
    }
  }*/

  // Funzione di logout
  const logout = () => {
    localStorage.removeItem("username");
    setJwtToken("");
    setUser("");
    setLoggedIn(false);
    setHomeRoute("/");
    logOut();
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

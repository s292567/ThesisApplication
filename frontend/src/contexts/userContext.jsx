// userContext.jsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { frontendRoutes as routes } from "../routes";

import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent,IAuthContext } from "react-oauth2-code-pkce"

const UserContext = createContext(undefined);

const useUserContext = () => useContext(UserContext);

// it's used to Load the user context the first time the app is loaded
const UserProvider = ({ children }) => {
  const {token, tokenData,login,logOut,error,loginInProgress} = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("")
  const [jwtToken, setJwtToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(tokenData!==undefined || loginInProgress);
  const [errorMsg, setErrorMsg] = useState("");
  const [homeRoute, setHomeRoute] = useState("/");
  const logout=logOut;
  const [generalRoutes, setGeneralRoutes] = useState({
    theses: "/",

  });
  const navigate = useNavigate();


/*  useEffect(() => {
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

  }, []);*/
  useEffect(() => {
    setLoggedIn(tokenData!==undefined || loginInProgress);
    console.log(tokenData);
    if (tokenData) {
      let role;
      if( tokenData.realm_access.roles.includes("Student"))
        role = "Student";
      else if(tokenData.realm_access.roles.includes("Professor"))
        role = "Professor";
      console.log(tokenData);
      setUserId(tokenData.email.split("@")[0]);

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
  }, [tokenData]);


  // Logout Function


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

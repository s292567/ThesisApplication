import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import StudentDashboardPage from "./pages/StudentDashBoardPage";
import ProfessorDashboardPage from "./pages/ProfessorDashboardPage";
import ProfessorProposalCreationPage from "./pages/ProfessorProposalCreation.jsx";
import LoginPage from "./pages/LoginPage";

import Login from "./API/Login.js";
import API_Profile from "./API/API_Profile.js";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <Layout></Layout>
    </Router>
  );
}

function Layout() {

    const [errorMsg, setErrorMsg] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [jwtToken, setJwtToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken !== "") {
            localStorage.setItem("jwt", jwtToken)
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
                API_Profile.getProfile(username).then((loggedUser) => {
                    setUser(loggedUser);
                    if (path == '/login' || path == '/signup')
                        navigate('/');
                }).catch((err) => {
                    setErrorMsg(err.detail)
                    setJwtToken('');
                    setUser('');
                    setLoggedIn(false);
                    navigate("login");
                });
            }
        }


    }, [jwtToken, user])


    const doLogIn = async (username, password) => {

        Login.login(username, password).then((token) => {
            setJwtToken(token);
            setLoggedIn(true);
            API_Profile.getProfile(username).then((loggedUser) => {
                setUser(loggedUser);
                if (loggedUser.role==="Student")
                    navigate('/studentDashboard/:'+loggedUser.username);
                if (loggedUser.role==="Professor")
                    navigate('/professorDashboard/:'+loggedUser.username);

            }).catch((err) => {
                setErrorMsg(err.detail)
                setJwtToken('');
                setUser('');
                setLoggedIn(false);
                navigate("login");
            });

        })
            .catch((err) => {
                setErrorMsg(err.detail)
                navigate("login");
            });
  };

  const doLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("jwt");
    setJwtToken("");
    setUser("");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div
      className="container-fluid"
      style={{ height: "90vh", marginTop: "7rem" }}
    >
      <div className="row align-items-start">
        <Routes>
          <Route index element={<LandingPage isLoggedIn={loggedIn} />} />
          <Route
            path="/login"
            element={
              <LoginPage
                LoginForm
                login={doLogIn}
                loggedIn={loggedIn}
                logout={doLogout}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
                isLoggedIn={loggedIn}
              ></LoginPage>
            }
          />


          {/** TO GO THE SPECIFIC ROUTE YOU NEED TO PUT professorDashboard/1 */}
          <Route
            path="/ProfessorDashboard/:professorId"
            element={<ProfessorDashboardPage />}
          />
          {/*<Route path="/ProfessorDashboard-:professorId/CreateNewProposal" element={<... />} />*/}

          <Route
            path="/studentDashboard/:studendId"
            element={<StudentDashboardPage />}
          />

          <Route
            path="/ProfessorDashboard/:professorId/proposal/create"
            element={<ProfessorProposalCreationPage />} 
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}



export default App;

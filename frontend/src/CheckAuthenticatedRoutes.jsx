// AuthenticatedRoutes.jsx
import React from "react";
import {Route, Routes} from "react-router-dom";

import {useUserContext} from "./contexts/index.js";

import {
  PageNotFound,
  StudentDashboardPage,
  ProfessorDashboardPage,
  ProfessorProposalCreationPage,
  LandingPage, LoginPage
} from "./pages/index.js"

import {frontendRoutes as routes} from "./routes/index.js"


const CheckAuthenticatedRoutes = () => {
  const {loggedIn} = useUserContext();

  return (
    <Routes>

      <Route path={routes.landingPage} element={<LandingPage/>}/>
      <Route path={routes.login} element={<LoginPage/>}/>

      {loggedIn &&
        <>
          <Route
            path={routes.professorDashboard}
            element={<ProfessorDashboardPage/>}
          />
          <Route
            path={routes.professorDashboardCreateNewProposal}
            element={<ProfessorProposalCreationPage/>}
          />
          <Route
            path={routes.studentDashboard}
            element={<StudentDashboardPage/>}
          />
        </>
      }

      <Route path="*" element={<PageNotFound/>}/>

    </Routes>
  );
};

export default CheckAuthenticatedRoutes;

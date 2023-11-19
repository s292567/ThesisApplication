// AuthenticatedRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import { useUserContext } from "./contexts";

import {
  PageNotFound,
  StudentDashboardPage,
  ProfessorDashboardPage,
  ProfessorProposalCreationPage,
  LandingPage,
  LoginPage,
} from "./pages";

import { frontendRoutes as routes } from "./routes";

const CheckAuthenticatedRoutes = () => {
  const { loggedIn } = useUserContext();

  return (
    <Routes>
      <Route path={routes.landingPage} element={<LandingPage />} />
      { !loggedIn && <Route path={routes.login} element={<LoginPage />} />}
      { /** It will be nice to display some popup page regarding the fact that you are already loggedIn.
       *    if you are not loggedIn you will be redirected to the Not Found Page, to not give you hints on the existence of the page.
       */}
      { loggedIn && (
        <>
          <Route
            path={routes.professorDashboard}
            element={<ProfessorDashboardPage />}
          />
          <Route
            path={routes.professorDashboardCreateNewProposal}
            element={<ProfessorProposalCreationPage />}
          />
          <Route
            path={routes.studentDashboard}
            element={<StudentDashboardPage />}
          />
        </>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default CheckAuthenticatedRoutes;

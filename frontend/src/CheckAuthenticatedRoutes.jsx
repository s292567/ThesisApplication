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
import DefaultLayoutPage from "./pages/DefaultLayoutPage/DefaultLayoutPage";

const CheckAuthenticatedRoutes = () => {
  // const { loggedIn } = useUserContext();
  const loggedIn = false;

  return (
    <Routes>
      <Route element={<DefaultLayoutPage />}>
        <Route path={routes.landingPage} element={<LandingPage />} />
        {!loggedIn && <Route path={routes.login} element={<LoginPage />} />}
        {/** It will be nice to display some popup page regarding the fact that you are already loggedIn.
         *    if you are not loggedIn you will be redirected to the Not Found Page, to not give you hints on the existence of the page.
         */}
         <Route path="*" element={<PageNotFound />} />
      </Route>
      {loggedIn && (
        <Route element={<LoggedInLayoutPage />}>
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
        </Route>
      )}
    </Routes>
  );
};

export default CheckAuthenticatedRoutes;

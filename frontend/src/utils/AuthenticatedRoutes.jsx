// AuthenticatedRoutes.jsx
import React from "react";
import Route from "react-router-dom";

import { useUserContext } from "../contexts";

import { PageNotFound, StudentDashboardPage, ProfessorDashboardPage, ProfessorProposalCreationPage } from "../pages"

import { frontendRoutes as routes} from "../routes"


const AuthenticatedRoutes = () => {
  const { loggedIn } = useUserContext();

  if (!loggedIn) return <PageNotFound />;

  return (
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
  );
};

export default AuthenticatedRoutes;

// AuthenticatedRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useUserContext } from "./userContext";

import StudentDashboardPage from "./pages/StudentDashboardPage.jsx";
import ProfessorDashboardPage from "./pages/ProfessorDashboardPage.jsx";
import ProfessorProposalCreationPage from "./pages/ProfessorProposalCreation.jsx";
import routes from "./assets/Routes.json";
import PageNotFound from "./pages/PageNotFound.jsx";

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

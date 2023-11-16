// AuthenticatedRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserContext } from './userContext';

import StudentDashboardPage from "./pages/StudentDashboardPage.jsx";
import ProfessorDashboardPage from "./pages/ProfessorDashboardPage.jsx";
import ProfessorProposalCreationPage from "./pages/ProfessorProposalCreation.jsx";
import routes from "./assets/Routes.json";

const AuthenticatedRoutes = () => {
    const { loggedIn } = useUserContext();

    if (!loggedIn) {
        return <></>;
    }

    return (
        <Routes>
            {/**N.B: for the future is better to have a routes wrapper instead of recreating everytime the page.  
             *       like professor creation proposal page is inside the professor dashboard page route --> means no need to recreate the page entirely
            */}
            <Route path={routes.professorDashboard} element={<ProfessorDashboardPage />} />
            <Route path={routes.professorDashboardCreateNewProposal} element={<ProfessorProposalCreationPage />} />
            <Route path={routes.studentDashboard} element={<StudentDashboardPage />} />
        </Routes>
    );
}

export default AuthenticatedRoutes;

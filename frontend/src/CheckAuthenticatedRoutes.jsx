// AuthenticatedRoutes.jsx
import React from "react";
import {Route, Routes} from "react-router-dom";

import {useUserContext} from "./contexts";

import {
    PageNotFound,
    StudentDashboardPage,
    ProfessorDashboardPage,
    ProfessorProposalCreationPage,
    LandingPage,
    LoginPage,
    DefaultLayoutPage,
} from "./pages";

import {frontendRoutes as routes} from "./routes";

const CheckAuthenticatedRoutes = () => {
    const {loggedIn} = useUserContext();

    return (
        <Routes>
            <Route element={<DefaultLayoutPage/>}>
                <Route path={routes.landingPage} element={<ProfessorDashboardPage/>}/>
                {!loggedIn && <Route path={routes.login} element={<LoginPage/>}/>}
                {loggedIn && (
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
                )}
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default CheckAuthenticatedRoutes;

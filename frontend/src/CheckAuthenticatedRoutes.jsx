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
    DefaultLayoutPage, StudentThesesPage, ProfessorThesesPage,
} from "./pages";

import {frontendRoutes as routes} from "./routes";

const CheckAuthenticatedRoutes = () => {
    const {loggedIn} = useUserContext();

    return (
        <Routes>
            <Route element={<DefaultLayoutPage/>}>
                <Route path={routes.landingPage} element={<LandingPage/>}/>
                {!loggedIn && <Route path={routes.login} element={<LoginPage/>}/>}
                {loggedIn && (
                    <>
                        <Route
                            path={routes.professorDashboard}
                            element={<ProfessorDashboardPage/>}
                        />
                        <Route
                            path={routes.professorNewThesis}
                            element={<ProfessorProposalCreationPage/>}
                        />
                        <Route
                          path={routes.professorTheses}
                          element={<ProfessorThesesPage/>}
                        />

                        <Route
                            path={routes.studentDashboard}
                            element={<StudentDashboardPage/>}
                        />
                        <Route
                          path={routes.studentTheses}
                          element={<StudentThesesPage />}
                        />

                    </>
                )}
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default CheckAuthenticatedRoutes;

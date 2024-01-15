// AuthenticatedRoutes.jsx
import React from "react";
import {Route, Routes} from "react-router-dom";

import {useUserContext} from "./contexts";

import {
    StudentDashboardPage,
    ProfessorDashboardPage,
    ProfessorProposalCreationPage,
    LandingPage,
    LoginPage,
    DefaultLayoutPage,
    ThesesPage, ProfessorApplicantsPage,
    StudentApplicationsPage,
    RefreshComponentPage,
    SecretaryPage,
    NewProposalPage,
    ArchivedThesesPage
} from "./pages";

import {frontendRoutes as routes} from "./routes";

const CheckAuthenticatedRoutes = () => {
    const {loggedIn} = useUserContext();

    return (
        <Routes>
            <Route path="/refresh" element={<RefreshComponentPage/>}/>
            <Route element={<DefaultLayoutPage/>}>
                <Route path={routes.landingPage} element={<LandingPage />}/>
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
                          element={<ThesesPage />}
                        />
                        <Route
                          path={routes.professorApplicants}
                          element={<ProfessorApplicantsPage />}
                        />
                        <Route
                            path={routes.professorArchivedTheses}
                            element={<ArchivedThesesPage/>}
                        />

                        <Route
                            path={routes.studentDashboard}
                            element={<StudentDashboardPage/>}
                        />
                        <Route
                          path={routes.studentTheses}
                          element={<ThesesPage />}
                        />

                        <Route
                            path={routes.studentApplications}
                            element={<StudentApplicationsPage/>}
                        />
                        <Route
                            path={routes.SecretaryDashboard}
                            element={<SecretaryPage/>}
                        />
                        <Route
                            path={routes.NewProposals}
                            element={<NewProposalPage/>}
                        />

                    </>
                )}
            </Route>
        </Routes>
    );
};

export default CheckAuthenticatedRoutes;

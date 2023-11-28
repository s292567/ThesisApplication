// AuthenticatedRoutes.jsx
import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";



import {
    PageNotFound,
    StudentDashboardPage,
    ProfessorDashboardPage,
    ProfessorProposalCreationPage,
    LandingPage,
    LoginPage,
    DefaultLayoutPage,
    ThesesPage, ProfessorApplicantsPage,
} from "./pages";

import {frontendRoutes as routes} from "./routes";
import {AuthContext} from "react-oauth2-code-pkce";

const CheckAuthenticatedRoutes = () => {
    const {token,login,loginInProgress}=useContext(AuthContext);
    const loggedIn=token||loginInProgress?true:false;

    return (
        <Routes>
            <Route element={<DefaultLayoutPage/>}>
                <Route path={routes.landingPage} element={<LandingPage />}/>

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
                            path={routes.studentDashboard}
                            element={<StudentDashboardPage/>}
                        />
                        <Route
                          path={routes.studentTheses}
                          element={<ThesesPage />}
                        />

                    </>
                )}
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default CheckAuthenticatedRoutes;

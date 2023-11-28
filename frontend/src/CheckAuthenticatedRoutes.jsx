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
    ThesesPage, ProfessorApplicantsPage,


} from "./pages";
import MyThesesPage from "./pages/StudentPages/MyThesesPage.jsx";
import {frontendRoutes as routes} from "./routes";

const CheckAuthenticatedRoutes = () => {
    const {loggedIn} = useUserContext();

    return (
        <Routes>
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
                            path={routes.studentDashboard}
                            element={<StudentDashboardPage/>}
                        />
                        <Route
                          path={routes.studentTheses}
                          element={<ThesesPage />}
                        />

                        <Route
                            path={routes.MyTheses}
                            element={<MyThesesPage/>}
                        />


                    </>
                )}
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default CheckAuthenticatedRoutes;

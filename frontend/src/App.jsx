// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./userContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

import routes from "./assets/Routes.json";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/** Into AuthenticatedRoutes there are only the routes visible if you are loggedIn */}
        <AuthenticatedRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

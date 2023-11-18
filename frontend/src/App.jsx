// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "./contexts"

import { AuthenticatedRoutes } from "./utils"
import { LoginPage, LandingPage, PageNotFound } from "./pages"

import { frontendRoutes as routes } from "./routes" 

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path={routes.landing} element={<LandingPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <AuthenticatedRoutes />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

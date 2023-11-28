// App.jsx

import React from "react";
import {  AuthProvider } from 'react-oauth2-code-pkce';

import { BrowserRouter } from "react-router-dom";


import CheckAuthenticatedRoutes from "./CheckAuthenticatedRoutes.jsx"

const authConfig = {
    clientId: 'springboot-keycloak-client',
    authorizationEndpoint: 'http://localhost:8080/realms/ThesisRealm/protocol/openid-connect/auth',
    logoutEndpoint: 'http://localhost:8080/realms/ThesisRealm/protocol/openid-connect/logout',
    tokenEndpoint: 'http://localhost:8080/realms/ThesisRealm/protocol/openid-connect/token',
    redirectUri: 'http://localhost:5173/',
    scope: 'profile openid',
    // Example to redirect back to original path after login has completed
    // preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
    // postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
    decodeToken: true,
    autoLogin: false,
}

function App() {
  return (
      <AuthProvider authConfig={authConfig}>
          <BrowserRouter>
            <CheckAuthenticatedRoutes />
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;

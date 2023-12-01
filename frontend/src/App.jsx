// App.jsx

import React from "react";

import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./contexts"

import CheckAuthenticatedRoutes from "./CheckAuthenticatedRoutes.jsx"
import {AuthProvider} from "react-oauth2-code-pkce";
const authConfig = {
    clientId: 'springboot-keycloak-client',
    authorizationEndpoint: 'http://localhost:8080/realms/ThesisRealm/protocol/openid-connect/auth',
    logoutEndpoint: 'http://localhost:8080/realms/ThesisRealm/protocol/openid-connect/logout',
    tokenEndpoint: 'http://localhost:8080/realms/ThesisRealm/protocol/openid-connect/token',
    redirectUri: 'http://localhost:5153/', //change this to localhost:3000 if in developent/ localhost:8081 in deploy
    scope: 'profile openid',
    // Example to redirect back to original path after login has completed
    // preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
    // postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
    decodeToken: true,
    autoLogin: false,
    onRefreshTokenExpire: (event) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
}

function App() {
  return (
    <BrowserRouter>
        <AuthProvider authConfig={authConfig}>
          <UserProvider>
              <CheckAuthenticatedRoutes />
          </UserProvider>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./contexts"

import CheckAuthenticatedRoutes from "./CheckAuthenticatedRoutes.jsx"

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
          <CheckAuthenticatedRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

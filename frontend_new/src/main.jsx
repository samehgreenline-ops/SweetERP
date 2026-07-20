import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CompanyProvider } from "./context/CompanyContext.jsx";

import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <CompanyProvider>

        <App />

      </CompanyProvider>

    </AuthProvider>

  </React.StrictMode>

);
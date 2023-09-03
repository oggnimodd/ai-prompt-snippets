import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../styles/globals.css";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true }}>
      <App />
    </Router>
  </React.StrictMode>,
);

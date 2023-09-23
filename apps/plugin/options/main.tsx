import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { HashRouter as Router } from "react-router-dom";
import "../styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router future={{ v7_startTransition: true }}>
        <App />
      </Router>
    </NextUIProvider>
  </React.StrictMode>,
);

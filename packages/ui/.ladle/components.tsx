import type { GlobalProvider } from "@ladle/react";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "../index.css";
import "./style.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return (
    <Router>
      <div className={globalState.theme}>{children}</div>
    </Router>
  );
};

import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { HashRouter as Router } from "react-router-dom";
import "../styles/globals.css";

export default function Options() {
  return (
    <NextUIProvider>
      <Router future={{ v7_startTransition: true }}>
        <App />
      </Router>
    </NextUIProvider>
  );
}

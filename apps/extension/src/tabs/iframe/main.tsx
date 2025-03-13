import React from "react";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import "../../styles/globals.css";

export default function Iframe() {
  return (
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
}

import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";

export default function Popup() {
  return (
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
}

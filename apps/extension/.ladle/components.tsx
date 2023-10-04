import React, { useLayoutEffect } from "react";
import type { GlobalProvider } from "@ladle/react";

import "../styles/globals.css";
import "./ladle.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const theme = globalState.theme;

  useLayoutEffect(() => {
    const body = document.body;

    if (theme === "dark") {
      body.classList.remove("light");
      body.classList.add("dark");
    } else if (theme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }, [theme]);

  return <div className={theme}>{children}</div>;
};

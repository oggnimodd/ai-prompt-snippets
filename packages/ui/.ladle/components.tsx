import React, { useLayoutEffect } from "react";
import type { GlobalProvider } from "@ladle/react";
import { NextUIProvider } from "@nextui-org/react";

import "../index.css";
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

  return (
    <NextUIProvider>
      <div className={globalState.theme}>{children}</div>
    </NextUIProvider>
  );
};

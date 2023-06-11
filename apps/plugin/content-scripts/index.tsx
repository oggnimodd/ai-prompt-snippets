import React from "react";
import ReactDOM from "react-dom/client";
import Magic from "./Magic";

let className = "";

// Hide the default textarea
const defaultTextArea = document.querySelector(
  "#prompt-textarea",
) as HTMLTextAreaElement;

const parentElement = defaultTextArea.parentElement;

if (defaultTextArea) {
  className = defaultTextArea.className;
  defaultTextArea.style.display = "none";
}

if (parentElement) {
  const dummyElement = document.createElement("div");

  parentElement.appendChild(dummyElement);

  const inputButton = parentElement.querySelector(
    "button",
  ) as HTMLButtonElement;

  ReactDOM.createRoot(dummyElement).render(
    <React.StrictMode>
      <Magic
        target={defaultTextArea}
        className={className}
        inputButton={inputButton}
      />
    </React.StrictMode>,
  );
}

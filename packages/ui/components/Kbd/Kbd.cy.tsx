import React from "react";
import Kbd from "./Kbd";

describe("Kbd", () => {
  it("renders the provided text", () => {
    const text = "Ctrl+C";
    cy.mount(<Kbd>{text}</Kbd>);
    cy.get("kbd").should("contain.text", text);
  });
});

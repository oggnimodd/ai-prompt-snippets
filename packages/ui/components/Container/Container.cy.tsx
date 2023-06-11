import React from "react";
import Container from "./Container";

describe("Container", () => {
  it("should render children", () => {
    cy.mount(<Container>Click me!</Container>);
    cy.get("div").should("contain.text", "Click me!");
  });
});

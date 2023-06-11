import React from "react";
import Brand from "./Brand";

describe("Brand", () => {
  it("should render custom title", () => {
    cy.mount(<Brand title="Custom" />);

    cy.get("span").should("contain.text", "Custom");
  });
});

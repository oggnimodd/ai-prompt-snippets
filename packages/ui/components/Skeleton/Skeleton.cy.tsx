import React from "react";
import Skeleton from "./Skeleton";

describe("Skeleton component", () => {
  it("should render correctly", () => {
    cy.mount(<Skeleton style={{ height: 200 }} data-cy="skeleton" />);
    cy.getByDataCy("skeleton").should("exist");
  });
});

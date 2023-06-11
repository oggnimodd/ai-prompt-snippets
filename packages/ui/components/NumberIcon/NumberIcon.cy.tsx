import React from "react";
import NumberIcon from "./NumberIcon";

describe("NumberIcon", () => {
  it("should render icon on the left by default", () => {
    const icon = <div data-cy="icon">icon</div>;
    cy.mount(<NumberIcon icon={icon} number={1} />);
    cy.getByDataCy("icon").should("be.visible");
    cy.get(".flex-row").should("exist");
  });

  it("should render icon on the right when specified", () => {
    const icon = <div data-cy="icon">icon</div>;
    cy.mount(<NumberIcon icon={icon} number={1} iconPosition="right" />);
    cy.getByDataCy("icon").should("be.visible");
    cy.get(".flex-row-reverse").should("exist");
  });
});

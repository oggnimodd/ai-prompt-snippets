import React from "react";
import Collapsible from "./Collapsible";

describe("Collapsible", () => {
  it("should render the header and children", () => {
    cy.mount(
      <Collapsible header="Header">
        <div>Content</div>
      </Collapsible>,
    );

    cy.getByDataCy("collapsible-button").should("exist");
    cy.getByDataCy("collapsible-icon").should("exist");
    cy.getByDataCy("collapsible-button").click();
    cy.getByDataCy("collapsible-panel").should("exist");
  });

  it("should toggle content visibility when clicking the header", () => {
    cy.mount(
      <Collapsible header="Header">
        <div>Content</div>
      </Collapsible>,
    );
    cy.getByDataCy("collapsible-button").should("exist");
    cy.getByDataCy("collapsible-button").click();
    cy.getByDataCy("collapsible-panel").should("be.visible");

    cy.getByDataCy("collapsible-button").click();
    cy.getByDataCy("collapsible-panel").should("not.exist");
  });

  it("should be able to hide icon", () => {
    cy.mount(
      <Collapsible header="Header" hideIcon>
        <div>Content</div>
      </Collapsible>,
    );
    cy.getByDataCy("collapsible-button").should("exist");
    cy.getByDataCy("collapsible-icon").should("not.exist");
  });
});

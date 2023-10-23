import React from "react";
import Toast from "./Toast";

describe("Toast Component", () => {
  it("renders toast with default variant and description", () => {
    cy.mount(<Toast description="Default Toast" />);
    cy.get("[data-cy='toast']").should("exist");
    cy.get("[data-cy='toast-variant']").should("have.text", "success");
    cy.get("[data-cy='toast-description']").should(
      "have.text",
      "Default Toast",
    );
  });

  it("renders error variant toast", () => {
    cy.mount(<Toast description="Error Toast" variant="error" />);
    cy.get("[data-cy='toast']").should("exist");
    cy.get("[data-cy='toast-variant']").should("have.text", "error");
    cy.get("[data-cy='toast-description']").should("have.text", "Error Toast");
  });

  it("renders closable toast and triggers onClose callback when closed", () => {
    const onClose = cy.stub().as("onClose");
    cy.mount(
      <Toast description="Closable Toast" isClosable onClose={onClose} />,
    );
    cy.get("[data-cy='toast']").should("exist");
    cy.get("[data-cy='close-button']").click();
    cy.get("@onClose").should("be.calledOnce");
  });

  it("does not render close button for non-closable toast", () => {
    cy.mount(<Toast description="Non-Closable Toast" />);
    cy.get("[data-cy='toast']").should("exist");
    cy.get("[data-cy='close-button']").should("not.exist");
  });

  it("renders toast with custom className", () => {
    cy.mount(
      <Toast description="Custom Class Toast" className="custom-class" />,
    );
    cy.get("[data-cy='toast']").should("have.class", "custom-class");
    cy.get("[data-cy='toast-description']").should(
      "have.text",
      "Custom Class Toast",
    );
  });
});

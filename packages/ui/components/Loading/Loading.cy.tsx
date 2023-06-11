import React from "react";
import Loading from "./Loading";
import LoadingWithMessage from "./LoadingWithMessage";

describe("Loading", () => {
  context("Loading", () => {
    it("should render correctly", () => {
      cy.mount(<Loading />);
      cy.getByDataCy("loading-indicator");
    });
  });

  context("Loading with message", () => {
    it("should render the default message", () => {
      cy.mount(<LoadingWithMessage />);
      cy.getByDataCy("loading-message").should("contain", "loading...");
    });

    it("should render correctly with custom message", () => {
      cy.mount(<LoadingWithMessage message="Please wait..." />);
      cy.getByDataCy("loading-message").should("contain", "Please wait...");
    });
  });
});

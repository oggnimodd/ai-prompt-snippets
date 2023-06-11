import React from "react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("renders the correct brand", () => {
    cy.mount(<Sidebar open setOpen={() => {}} />);
    cy.contains("RepoExplorer");
  });

  it("calls the setOpen function when closed", () => {
    const clickSpy = cy.spy().as("clickSpy");
    cy.mount(<Sidebar setOpen={clickSpy} open={true} />);

    cy.get("button").click();

    cy.get("@clickSpy").should("be.called");
  });
});

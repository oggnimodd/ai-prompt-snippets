import React from "react";
import HeaderIconButton from "./HeaderIconButton";
import HeaderContainer from "./HeaderContainer";

describe("Header", () => {
  context("Header Container", () => {
    it("Should use header tag", () => {
      cy.mount(<HeaderContainer>Test</HeaderContainer>);

      cy.get("header");
    });

    it("Should render children correctly", () => {
      cy.mount(
        <HeaderContainer>
          <p>Test</p>
          <button>Test Button</button>
        </HeaderContainer>,
      );
      cy.get("header").get("p").should("contain.text", "Test");
      cy.get("header").get("button").should("contain.text", "Test Button");
    });
  });

  context("Header Icon Button", () => {
    it("Should render icon", () => {
      cy.mount(<HeaderIconButton icon={<span data-cy="icon" />} />);

      cy.getByDataCy("icon").should("exist");
    });
  });
});

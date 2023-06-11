import React from "react";
import Button from "./Button";
import { Link } from "../Link";

describe("Button", () => {
  it("uses custom text for the button label", () => {
    cy.mount(<Button>Click me!</Button>);
    cy.get("button").should("contain.text", "Click me!");
  });

  it("shouldn't be able to click a disabled button", () => {
    const buttonSelector = "button";

    const clickSpy = cy.spy().as("clickSpy");
    cy.mount(
      <Button disabled onClick={clickSpy}>
        Click me!
      </Button>,
    );
    cy.get(buttonSelector).click({ force: true });
    cy.get("@clickSpy").should("not.be.called");
  });

  it("should be able to click the button", () => {
    const clickSpy = cy.spy().as("clickSpy");

    cy.mount(<Button onClick={clickSpy}>Click me!</Button>);

    cy.get("button").click();
    cy.get("@clickSpy").should("be.calledOnce");
  });

  it("should be a polymorphic component", () => {
    cy.mount(
      <>
        <Button component="span">Click me!</Button>
        <Button component="div">Click me!</Button>
        <Button href="#" component={Link}>
          Click me!
        </Button>
      </>,
    );

    cy.get("span");
    cy.get("div");
    cy.get("a");
  });
});

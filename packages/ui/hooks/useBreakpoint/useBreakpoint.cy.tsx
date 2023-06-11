import React from "react";

import { breakpoints, useBreakpoint, type BreakpointKey } from ".";

const Renderer = ({ breakpoint }: { breakpoint: BreakpointKey }) => {
  const isMatch = useBreakpoint(breakpoint);

  return <span data-cy={breakpoint}>{String(isMatch)}</span>;
};

describe("useBreakpoint", () => {
  beforeEach(() => {
    cy.mount(
      <>
        {Object.keys(breakpoints).map((breakpoint) => {
          return (
            <Renderer
              key={breakpoint}
              breakpoint={breakpoint as BreakpointKey}
            />
          );
        })}
      </>,
    );
  });

  it("returns true when it matches the breakpoint value", () => {
    // Very large screen width
    cy.viewport(1536, 500);
    cy.getByDataCy("sm").should("contain.text", "true");
    cy.getByDataCy("md").should("contain.text", "true");
    cy.getByDataCy("lg").should("contain.text", "true");
    cy.getByDataCy("xl").should("contain.text", "true");
    cy.getByDataCy("2xl").should("contain.text", "true");
  });

  it("returns false when it does not match the breakpoint value", () => {
    // Very small screen width
    cy.viewport(400, 500);
    cy.getByDataCy("sm").should("contain.text", "false");
    cy.getByDataCy("md").should("contain.text", "false");
    cy.getByDataCy("lg").should("contain.text", "false");
    cy.getByDataCy("xl").should("contain.text", "false");
    cy.getByDataCy("2xl").should("contain.text", "false");
  });
});

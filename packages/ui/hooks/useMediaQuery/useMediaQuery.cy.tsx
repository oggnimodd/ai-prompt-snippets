import React from "react";

import { useMediaQuery } from ".";

const Renderer = ({ query }: { query: string }) => {
  const isMatch = useMediaQuery(query);

  return <span>{String(isMatch)}</span>;
};

describe("useMediaQuery", () => {
  it("returns true when the media query matches", () => {
    cy.viewport(500, 500);

    cy.mount(<Renderer query="(min-width: 400px)" />);
    cy.get("span").should("contain.text", "true");
  });

  it("returns false when the media query does not match", () => {
    cy.viewport(300, 300);
    cy.mount(<Renderer query="(min-width: 400px)" />);
    cy.get("span").should("contain.text", "false");
  });
});

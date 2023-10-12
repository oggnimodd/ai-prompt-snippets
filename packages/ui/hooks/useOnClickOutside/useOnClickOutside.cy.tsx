import React, { useRef } from "react";

import { useOnClickOutside } from ".";

const TestComponent = ({
  handler,
}: {
  handler: (event: MouseEvent | TouchEvent) => void;
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside({ ref: divRef, handler });
  return (
    <div>
      <div data-cy="target" style={{ width: 200, height: 200 }} ref={divRef}>
        Test
      </div>
      <span>Outside</span>
    </div>
  );
};

describe("useOnClickOutside", () => {
  it("calls the handler when clicking outside the element", () => {
    const clickSpy = cy.spy().as("clickSpy");

    cy.mount(<TestComponent handler={clickSpy} />);
    cy.get("span").click();
    cy.get("@clickSpy").should("have.been.calledOnce");
  });

  it("does not call the handler when clicking inside the element", () => {
    const clickSpy = cy.spy().as("clickSpy");
    cy.mount(<TestComponent handler={clickSpy} />);
    cy.getByDataCy("target").click();
    cy.get("@clickSpy").should("not.have.been.calledOnce");
  });
});

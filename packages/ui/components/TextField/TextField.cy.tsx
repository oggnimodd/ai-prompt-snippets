import React, { useRef, useState } from "react";
import TextField from "./TextField";

export const ControlledTextField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVal(inputRef.current?.value || "");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <p data-cy="submit-result">{val}</p>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
        <TextField ref={inputRef} placeholder="Input Something" />
        <button className="self-start" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

describe("TextField", () => {
  it("should render label and input", () => {
    cy.mount(<TextField label="Name" />);
    cy.contains("label", "Name");
  });

  it("should call onChange when input value changes", () => {
    const onChange = cy.stub();
    cy.mount(<TextField label="Name" onChange={onChange} />);
    cy.get("input").type("John Doe");
    cy.wrap(onChange).should("have.been.calledWith", "John Doe");
  });

  it("should pass the correct ref to the input element", () => {
    cy.mount(<ControlledTextField />);
    cy.get("input").type("John Doe");
    cy.get("form").submit();
    cy.getByDataCy("submit-result").should("contain.text", "John Doe");
  });
});

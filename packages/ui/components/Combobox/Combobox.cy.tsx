import React, { useState } from "react";
import Combobox, { Option } from "./Combobox";

const options: Option[] = ["Option 1", "Option 2", "Option 3"].map(
  (option, index) => ({
    key: `option_${index}`,
    label: option,
  }),
);

const ComboboxTest = () => {
  const [value, setValue] = useState<Option>(options[0] as Option);

  return <Combobox setSelected={setValue} selected={value} options={options} />;
};

describe("Combobox", () => {
  beforeEach(() => {
    cy.mount(<ComboboxTest />);
  });

  it("renders without errors", () => {
    cy.getByDataCy("combobox-input").should("exist");
    cy.getByDataCy("combobox-open-button").should("exist");
    cy.getByDataCy("combobox-clear-button").should("exist");
  });

  it("should display options when open button is clicked", () => {
    cy.getByDataCy("combobox-open-button").click();
    cy.getByDataCy("combobox-options").should("exist");
    options.forEach((option) => {
      cy.contains(option.label).should("be.visible");
    });
  });

  it("should filter options when typing in the input field", () => {
    cy.getByDataCy("combobox-input").clear().type("option 1");
    cy.contains("Option 1").should("be.visible");
    cy.contains("Option 2").should("not.exist");
    cy.contains("Option 3").should("not.exist");
  });

  it("should select an option when clicked", () => {
    cy.getByDataCy("combobox-open-button").click();
    cy.contains("Option 1").click();
    cy.getByDataCy("combobox-input").should("have.value", "Option 1");
  });

  it("should clear the selected value when the X button is clicked", () => {
    cy.getByDataCy("combobox-clear-button").should("exist").click();
    cy.getByDataCy("combobox-input").should("have.value", "");
  });

  it("should display no results message if there is no options", () => {
    cy.getByDataCy("combobox-input").type("random text");
    cy.getByDataCy("combobox-no-results").should("exist");
    cy.contains("Option 1").should("not.exist");
    cy.contains("Option 2").should("not.exist");
    cy.contains("Option 3").should("not.exist");
  });
});

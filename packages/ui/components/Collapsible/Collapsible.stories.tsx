import Collapsible from "./Collapsible";
import { Container } from "../Container";
import { createSequentialNumbersArray } from "../../utils/createSequentialNumbersArray";

export const Default = () => {
  return (
    <Container>
      <div className="flex flex-col gap-y-5">
        {createSequentialNumbersArray(3).map((item) => {
          return (
            <Collapsible
              key={item}
              buttonClassName="rounded-xl border-2 border-black p-5 dark:border-primary"
              panelClassName="sm:ml-10 ml-4"
              header={<span>Hello world</span>}
            >
              <p className="mt-2 rounded-xl bg-primary-200 p-6 dark:text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                eligendi deserunt assumenda quibusdam optio odio est, dicta enim
                tempora modi dolorem libero ut laudantium voluptates
              </p>
            </Collapsible>
          );
        })}
      </div>
    </Container>
  );
};

export const IconSize = () => {
  return (
    <Container>
      <div className="flex flex-col gap-y-5">
        <Collapsible
          iconSize="sm"
          buttonClassName="rounded-xl border-2 border-black p-5 dark:border-primary"
          panelClassName="sm:ml-10 ml-4"
          header={<span>Small</span>}
        >
          <p />
        </Collapsible>
        <Collapsible
          iconSize="md"
          buttonClassName="rounded-xl border-2 border-black p-5 dark:border-primary"
          panelClassName="sm:ml-10 ml-4"
          header={<span>Medium</span>}
        >
          <p />
        </Collapsible>
        <Collapsible
          iconSize="lg"
          buttonClassName="rounded-xl border-2 border-black p-5 dark:border-primary"
          panelClassName="sm:ml-10 ml-4"
          header={<span>Large</span>}
        >
          <p />
        </Collapsible>
        <Collapsible
          iconSize="xl"
          buttonClassName="rounded-xl border-2 border-black p-5 dark:border-primary"
          panelClassName="sm:ml-10 ml-4"
          header={<span>Extra large</span>}
        >
          <p />
        </Collapsible>
      </div>
    </Container>
  );
};

export const Nested = () => {
  return (
    <Collapsible
      iconSize="lg"
      buttonClassName="mb-5 rounded-xl border-2 border-black p-5 dark:border-primary"
      panelClassName="sm:ml-10 ml-4"
      header={<span>Nested</span>}
    >
      <div className="flex flex-col gap-y-5">
        {createSequentialNumbersArray(3).map((item) => {
          return (
            <Collapsible
              key={item}
              buttonClassName="rounded-xl border-2 border-black p-5 dark:border-primary"
              panelClassName="sm:ml-10 ml-4"
              header={<span>Hello world</span>}
            >
              <p className="mt-2 rounded-xl bg-primary-200 p-6 dark:text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                eligendi deserunt assumenda quibusdam optio odio est, dicta enim
                tempora modi dolorem libero ut laudantium voluptates
              </p>
            </Collapsible>
          );
        })}
      </div>
    </Collapsible>
  );
};

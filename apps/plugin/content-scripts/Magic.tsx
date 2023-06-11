import React, { KeyboardEvent, useRef } from "react";

interface MagicProps {
  className?: string;
  target: HTMLTextAreaElement;
  inputButton: HTMLButtonElement;
}

const setNativeValue = (element: HTMLTextAreaElement, value: string) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value")?.set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value",
  )?.set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter?.call(element, value);
  } else {
    valueSetter?.call(element, value);
  }
};

const Magic: React.FC<MagicProps> = ({ target, inputButton }) => {
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

  const onChange = () => {
    let value = textAreaRef?.current?.value || "";

    if (value === "/img") {
      value = "This is what I want to achieve";
    }

    setNativeValue(
      document.querySelector("#prompt-textarea") as HTMLTextAreaElement,
      value,
    );

    target.value = value;

    target.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const enter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      inputButton.click();

      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      style={{
        width: "100%",
        border: "none",
        outline: "none",
      }}
      id="TEXTAREA"
      onChange={onChange}
      onKeyDown={enter}
    />
  );
};

export default Magic;

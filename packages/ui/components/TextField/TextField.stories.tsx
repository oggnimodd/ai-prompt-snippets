import React, { useRef, useState } from "react";
import TextField from "./TextField";
import { Button } from "../Button";

export const Default = () => {
  return (
    <div>
      <TextField placeholder="Input Something" />
    </div>
  );
};

export const Controlled = () => {
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
    <div>
      <p>
        Type something and see it here :{" "}
        <span className="text-primary-500">{val}</span>
      </p>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
        <TextField ref={inputRef} placeholder="Input Something" />
        <Button className="self-start" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export const MaxWidth = () => {
  return (
    <div>
      <TextField className="max-w-[300px]" placeholder="Search Product" />
    </div>
  );
};

export const WidthLabel = () => {
  return (
    <div>
      <TextField
        label="Something Label"
        className="max-w-[300px]"
        placeholder="Search Product"
      />
    </div>
  );
};

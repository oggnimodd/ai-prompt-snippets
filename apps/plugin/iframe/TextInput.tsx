import { Button, TextField } from "@acme/ui";
import { useRef } from "react";

const TextInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Since this is an iframe , send the message to the parent window
    window.parent.postMessage(inputRef.current?.value || "", "*");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <TextField ref={inputRef} type="text" />
      <Button size="sm" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default TextInput;

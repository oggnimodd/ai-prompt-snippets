import { Button, Textarea } from "@nextui-org/react";
import { KeyboardEvent, useRef } from "react";

const TEXTAREA_HIGH_LIMIT = 200;

const PromptBuilder = () => {
  const textareaRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Since this is an iframe , send the message to the parent window
    window.parent.postMessage(textareaRef.current?.value || "", "*");

    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  const enter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        TEXTAREA_HIGH_LIMIT,
      )}px`;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      console.log(textareaRef.current?.value);

      // Since this is an iframe , send the message to the parent window
      window.parent.postMessage(textareaRef.current?.value || "", "*");

      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.style.height = "";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
      <Textarea
        id="prompt-textarea"
        label="Prompt"
        labelPlacement="outside"
        ref={textareaRef}
        type="text"
        onKeyDown={enter}
        placeholder="Create a short story about the danger of AI"
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default PromptBuilder;

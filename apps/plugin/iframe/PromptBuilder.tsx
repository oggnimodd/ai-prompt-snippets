import { Button, TextArea } from "@acme/ui";
import { KeyboardEvent, useRef } from "react";

const TEXTAREA_HIGH_LIMIT = 200;

const PromptBuilder = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Since this is an iframe , send the message to the parent window
    window.parent.postMessage(textareaRef.current?.value || "", "*");

    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  const enter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <TextArea
        id="prompt-textarea"
        label="Prompt"
        ref={textareaRef}
        type="text"
        onKeyDown={enter}
        className="h-44"
      />
      <Button size="sm" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default PromptBuilder;

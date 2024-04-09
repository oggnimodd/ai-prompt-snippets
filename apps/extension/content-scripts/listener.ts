import { extensionUrl } from "utils/chrome";
import { PromptData, IframeMessage } from "utils/message";
import type { ChatProvider } from "models/provider";

class Listener {
  private chatprovider: ChatProvider;
  private prompt: string;

  constructor(provider: ChatProvider) {
    this.chatprovider = provider;
    this.prompt = "";
  }

  listen() {
    // Listen message from iframe
    window.addEventListener(
      "message",
      (event: MessageEvent<IframeMessage<PromptData>>) => {
        if (
          event.origin === extensionUrl &&
          event.data.type === "ENTER_PROMPT"
        ) {
          this.prompt = event.data?.message?.prompt || "";

          if (!this.prompt) return;

          switch (this.chatprovider) {
            case "chat-gpt":
              this.chatGPT();
              break;
            case "claude":
              this.claude();
              break;
            case "perplexity":
              this.perplexity();
              break;
            case "poe":
              this.poe();
              break;
            case "gemini":
              this.gemini();
              break;
            default:
              break;
          }
        }
      },
    );
  }

  chatGPT() {
    const promptField = document.querySelector(
      "#prompt-textarea",
    ) as HTMLTextAreaElement;
    const submitButton = document.querySelector(
      '[data-testid="send-button"]',
    ) as HTMLButtonElement;

    this.setNativeValue(promptField, this.prompt);
    this.submit(submitButton);
  }

  claude() {
    const promptField = document.querySelector(
      "[contenteditable='true'].ProseMirror",
    ) as HTMLDivElement;

    const paragraph = document.createElement("p");
    paragraph.innerHTML = this.prompt;
    promptField.appendChild(paragraph);

    setTimeout(() => {
      const submitButton =
        (document.querySelector(
          "[aria-label='Send Message']",
        ) as HTMLButtonElement) ||
        (document.querySelector(
          "[cmdk-item][role='option'] button",
        ) as HTMLButtonElement);

      this.submit(submitButton);
    }, 100);
  }

  poe() {
    const promptField = document.querySelector(
      "[class*='ChatMessageInputContainer_textArea'] textarea",
    ) as HTMLTextAreaElement;
    const submitButton = document.querySelector(
      "[class*='sendButton']",
    ) as HTMLButtonElement;

    if (submitButton.disabled) {
      submitButton.removeAttribute("disabled");
    }

    promptField.value = this.prompt;
    promptField.dispatchEvent(new Event("input", { bubbles: true }));

    this.submit(submitButton);
  }

  perplexity() {
    const promptField =
      (document.querySelector(
        "textarea[placeholder*='follow']",
      ) as HTMLTextAreaElement) ||
      (document.querySelector(
        "textarea[placeholder*='nything']",
      ) as HTMLTextAreaElement);

    const submitButton =
      (document.querySelector(
        "button:has(svg[data-icon='arrow-right'])",
      ) as HTMLButtonElement) ||
      (document.querySelector(
        "button:has(svg[data-icon='arrow-up'])",
      ) as HTMLButtonElement);

    submitButton.removeAttribute("disabled");

    promptField.value = this.prompt;
    promptField.dispatchEvent(new Event("input", { bubbles: true }));

    setTimeout(() => {
      this.submit(submitButton);
    }, 100);
  }

  gemini() {
    const promptField = document.querySelector(
      ".ql-editor.textarea",
    ) as HTMLDivElement;

    const paragraph = document.createElement("p");
    paragraph.innerHTML = this.prompt;
    promptField.appendChild(paragraph);

    setTimeout(() => {
      const submitButton = document.querySelector(
        ".send-button-container button",
      ) as HTMLButtonElement;

      this.submit(submitButton);
    }, 100);
  }

  submit(submitButton: HTMLButtonElement) {
    submitButton.click();
  }

  setNativeValue = (element: HTMLTextAreaElement, value: string) => {
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

    element.value = value;

    element.dispatchEvent(new Event("input", { bubbles: true }));
  };
}

export default Listener;

import { getExtensionUrl } from "utils/chrome";

type ChatProvider = "chat-gpt" | "poe" | "claude" | "perplexity";

const extensionUrl = getExtensionUrl();

class Listener {
  private autoSubmit: boolean;
  private chatprovider: ChatProvider;

  constructor(autoSubmit: boolean, provider: ChatProvider) {
    this.autoSubmit = autoSubmit;
    this.chatprovider = provider;
  }

  listen() {
    // Listen message from iframe
    window.addEventListener("message", (event) => {
      if (event.origin === extensionUrl) {
        if (this.chatprovider === "chat-gpt") {
          const promptField = document.querySelector(
            "#prompt-textarea",
          ) as HTMLTextAreaElement;
          const submitButton = document.querySelector(
            '[data-testid="send-button"]',
          ) as HTMLButtonElement;

          this.setNativeValue(promptField, event.data);

          this.submit(submitButton);
        }

        if (this.chatprovider === "poe") {
          const promptField = document.querySelector(
            "[class*='ChatMessageInputContainer_textArea'] textarea",
          ) as HTMLTextAreaElement;
          const submitButton = document.querySelector(
            "[class*='ChatMessageInputContainer_submitButton']",
          ) as HTMLButtonElement;

          if (submitButton.disabled) {
            submitButton.removeAttribute("disabled");
          }

          promptField.value = event.data;
          promptField.dispatchEvent(new Event("input", { bubbles: true }));

          this.submit(submitButton);
        }

        if (this.chatprovider === "claude") {
          const promptField = document.querySelector(
            "[contenteditable='true'].ProseMirror",
          ) as HTMLDivElement;

          const paragraph = document.createElement("p");
          paragraph.innerHTML = event.data;
          promptField.appendChild(paragraph);

          setTimeout(() => {
            const submitButton = document.querySelector(
              "[aria-label='Send Message']",
            ) as HTMLButtonElement;

            this.submit(submitButton);
          }, 100);
        }

        if (this.chatprovider === "perplexity") {
          const promptField =
            (document.querySelector(
              "textarea[placeholder*='follow']",
            ) as HTMLTextAreaElement) ||
            (document.querySelector(
              "textarea[placeholder*='nything']",
            ) as HTMLTextAreaElement);
          const submitButton =
            (document.querySelector(
              ".relative > div:has(lt-mirror):has(textarea) ~ div.absolute:has(button + button) button:has(svg[data-icon*='arrow'])",
            ) as HTMLButtonElement) ||
            document.querySelector(
              ".relative:has(textarea[placeholder*='nything']) button:has(svg[data-icon*='arrow'])",
            );

          if (submitButton.disabled) {
            submitButton.removeAttribute("disabled");
          }

          promptField.value = event.data;
          promptField.dispatchEvent(new Event("input", { bubbles: true }));

          this.submit(submitButton);
        }
      }
    });
  }

  submit(submitButton: HTMLButtonElement) {
    if (this.autoSubmit) {
      submitButton.click();
    }
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

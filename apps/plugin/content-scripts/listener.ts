type ChatProvider = "chat-gpt" | "poe";

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
      // For chatgpt

      if (
        event.origin === "chrome-extension://bmobgkekollfcijfkncdgbbdpmpjflia"
      ) {
        if (this.chatprovider === "chat-gpt") {
          const promptField = document.querySelector(
            "#prompt-textarea",
          ) as HTMLTextAreaElement;
          const inputButton = document.querySelector(
            '[data-testid="send-button"]',
          ) as HTMLButtonElement;

          this.setNativeValue(promptField, event.data);

          if (this.autoSubmit) {
            inputButton.click();
          }
        }

        if (this.chatprovider === "poe") {
          const promptField = document.querySelector(
            "[class*='ChatMessageInputContainer_textArea'] textarea",
          ) as HTMLTextAreaElement;
          const inputButton = document.querySelector(
            "[class*='ChatMessageInputContainer_sendButton']",
          ) as HTMLButtonElement;

          if (inputButton.disabled) {
            inputButton.removeAttribute("disabled");
          }

          promptField.value = event.data;
          promptField.dispatchEvent(new Event("input", { bubbles: true }));

          if (this.autoSubmit) {
            inputButton.click();
          }
        }
      }
    });
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

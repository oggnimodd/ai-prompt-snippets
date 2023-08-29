class Listener {
  private autoSubmit: boolean;

  constructor(autoSubmit: boolean) {
    this.autoSubmit = autoSubmit;
  }

  listen() {
    // Listen message from iframe
    window.addEventListener("message", (event) => {
      // For chatgpt

      if (
        event.origin === "chrome-extension://bmobgkekollfcijfkncdgbbdpmpjflia"
      ) {
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

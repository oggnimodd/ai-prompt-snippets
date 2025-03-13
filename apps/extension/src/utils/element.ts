export const waitForElement = (
  selector: string,
  timeout = 5000,
): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    // Check if the element is already in the DOM
    const element = document.querySelector(selector);
    if (element) {
      return resolve(element as HTMLElement);
    }

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el as HTMLElement);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Reject the promise if the element isn't found within the timeout
    setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(
          `Element with selector "${selector}" not found within ${timeout}ms`,
        ),
      );
    }, timeout);
  });
};

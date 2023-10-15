// Define a TypeScript interface for the storage object
interface StorageObject {
  [key: string]: any;
}

type AllowedKey = "snippets" | "theme" | "providers";

// Define a function to set or update a value in local storage
export const setOrUpdateLocalStorageValue = (
  key: AllowedKey,
  value: any,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      const storageObject: StorageObject = { ...result };
      storageObject[key] = value;

      chrome.storage.local.set(storageObject, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          // console.log(`Value for key "${key}" is set or updated to ${value}`);
          resolve();
        }
      });
    });
  });
};

// Define a function to get a value from local storage
export const getLocalStorageValue = (key: AllowedKey): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const value = result[key];
        // console.log(`Value for key "${key}" is currently ${value}`);
        resolve(value);
      }
    });
  });
};

export const extensionUrl = `chrome-extension://${chrome.runtime.id}`;
export const optionsUrl = `${extensionUrl}/options/index.html#/`;

export const openOptionsPage = () => {
  chrome.tabs.query({ url: `${extensionUrl}/options/index.html` }, (tabs) => {
    if (tabs?.length && tabs[0]?.id) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: optionsUrl });
    }
  });
};

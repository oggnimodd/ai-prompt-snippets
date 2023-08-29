import Listener from "./listener";

const iframeContainer = document.querySelector(
  "#__next > .overflow-hidden > .dark + div",
);

if (iframeContainer) {
  // create div tag with 200px width
  const newDiv = document.createElement("div");
  newDiv.style.width = "250px";
  newDiv.style.height = "100%";

  iframeContainer.append(newDiv);

  const extensionUrl = chrome.runtime.getURL("/");

  const iframeUrl = `${extensionUrl}iframe/index.html`;
  const iframe = document.createElement("iframe");

  iframe.src = iframeUrl;
  // @ts-ignore
  iframe.style = "width: 100%; height: 100%;";

  newDiv.append(iframe);

  const listener = new Listener(true);
  listener.listen();
}

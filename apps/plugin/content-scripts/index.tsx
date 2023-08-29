import Listener from "./listener";

const newDiv = document.createElement("div");
const hostname = window.location.hostname;
let iframeMountPointParent: HTMLElement | null;

if (hostname === "chat.openai.com") {
  // create div tag with 200px width
  newDiv.style.width = "250px";
  newDiv.style.height = "100%";

  iframeMountPointParent = document.querySelector(
    "#__next > .overflow-hidden > .dark + div",
  );

  if (iframeMountPointParent) {
    iframeMountPointParent.append(newDiv);

    const extensionUrl = chrome.runtime.getURL("/");

    const iframeUrl = `${extensionUrl}iframe/index.html`;
    const iframe = document.createElement("iframe");

    iframe.src = iframeUrl;
    // @ts-ignore
    iframe.style = "width: 100%; height: 100%;";

    newDiv.append(iframe);

    const listener = new Listener(true, "chat-gpt");
    listener.listen();
  }
}

if (hostname === "poe.com") {
  // create div tag with 200px width
  newDiv.style.width = "250px";
  newDiv.style.height = "100%";

  iframeMountPointParent = document.querySelector(
    "#__next > [class*='SidebarLayout_layoutWrapper']",
  );

  iframeMountPointParent?.querySelector("aside:last-child")?.remove();

  if (iframeMountPointParent) {
    iframeMountPointParent.append(newDiv);

    const extensionUrl = chrome.runtime.getURL("/");

    const iframeUrl = `${extensionUrl}iframe/index.html`;
    const iframe = document.createElement("iframe");

    iframe.src = iframeUrl;
    // @ts-ignore
    iframe.style =
      "width: 100%; height: 100%; border: none!important; outline:none!important;";

    newDiv.append(iframe);

    const listener = new Listener(true, "poe");
    listener.listen();
  }
}

import { extensionUrl } from "utils/chrome";
import Listener from "./listener";

const newDiv = document.createElement("div");
const hostname = window.location.hostname;
let iframeMountPointParent: HTMLElement | null;
const iframeUrl = `${extensionUrl}/iframe/index.html`;
const iframe = document.createElement("iframe");

if (hostname === "chat.openai.com") {
  iframeMountPointParent = document.querySelector(
    "#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden",
  );

  const main = iframeMountPointParent?.querySelector("main");

  if (iframeMountPointParent && main) {
    main.style.width = "calc(100% - 250px)";

    iframeMountPointParent.classList.remove("flex-col");
    iframeMountPointParent.classList.add("flex-row");
    iframeMountPointParent.append(newDiv);

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
    "[class*='SidebarLayout_layoutWrapper']",
  );

  iframeMountPointParent?.querySelector("aside:last-child")?.remove();

  if (iframeMountPointParent) {
    iframeMountPointParent.append(newDiv);

    iframe.src = iframeUrl;
    // @ts-ignore
    iframe.style =
      "width: 100%; height: 100%; border: none!important; outline:none!important;";

    newDiv.append(iframe);

    const listener = new Listener(true, "poe");
    listener.listen();
  }
}

if (hostname === "claude.ai") {
  newDiv.className = "fixed top-0 left-0 z-[9999]";
  // @ts-ignore
  newDiv.style = "width:250px;height:100%;padding-top:60px;";

  iframeMountPointParent = document.querySelector("body");

  if (iframeMountPointParent) {
    iframeMountPointParent.append(newDiv);

    iframe.src = iframeUrl;
    // @ts-ignore
    iframe.style =
      "width: 100%; height: 100%; border: none!important; outline:none!important;";

    newDiv.append(iframe);

    const listener = new Listener(true, "claude");
    listener.listen();
  }
}

if (hostname === "www.perplexity.ai") {
  // @ts-ignore
  newDiv.style = "position:sticky;top:0;right:0;width:auto;height:100vh;";

  iframeMountPointParent = document.querySelector(
    "main > div > div > div + div",
  );

  if (iframeMountPointParent) {
    iframeMountPointParent.classList.add("flex", "relative");
    const mainContainer = document.querySelector(
      "main > div > div > div + div > div:first-child",
    );

    if (mainContainer) {
      //@ts-ignore
      mainContainer.style = "flex:1";
    }

    iframeMountPointParent.append(newDiv);

    iframe.src = iframeUrl;
    // @ts-ignore
    iframe.style =
      "width: 100%; height: 100%; border: none!important; outline:none!important;";

    newDiv.append(iframe);

    const listener = new Listener(true, "perplexity");
    listener.listen();
  }
}

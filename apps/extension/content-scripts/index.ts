import { extensionUrl } from "utils/chrome";
import { getLocalStorageValue } from "utils/storage";
import Listener from "./listener";
import { ChatHost, ChatProvider, SupportedProviders } from "models/provider";
import { IframeMessage } from "utils/message";

// TODO : create a new injectable css to handle all the styling

const newDiv = document.createElement("div");
newDiv.style.display = "flex";
const hostname = window.location.hostname as ChatHost;
let iframeMountPointParent: HTMLElement | null;
const iframeUrl = `${extensionUrl}/iframe/index.html`;
const iframe = document.createElement("iframe");
let togglerButton: HTMLButtonElement | null = null;

const injectTogglerButton = () => {
  const img = document.createElement("img");
  img.style.width = "30px";
  img.style.height = "30px";
  img.src = `${extensionUrl}/images/icon.svg`;

  const button = document.createElement("button");
  const radius = "10px";
  button.style.borderTopLeftRadius = radius;
  button.style.borderBottomLeftRadius = radius;
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.position = "fixed";
  button.style.right = "0px";
  button.style.top = "80px";
  button.style.display = "none";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.zIndex = "2147483647";
  button.style.backgroundColor = "#0070f0";
  button.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
  button.style.border = "none";
  button.style.outline = "none";

  button.append(img);
  button.onclick = toggleIframe;

  document.body.append(button);
  togglerButton = button;

  window.addEventListener(
    "message",
    (event: MessageEvent<IframeMessage<null>>) => {
      if (
        event.origin === extensionUrl &&
        event.data.type === "TOGGLE_IFRAME"
      ) {
        toggleIframe();
      }
    },
  );
};

const toggleIframe = () => {
  if (togglerButton?.style.display === "none") {
    togglerButton.style.display = "flex";
  } else if (togglerButton?.style.display === "flex") {
    togglerButton.style.display = "none";
  }

  if (newDiv?.style.display === "none") {
    newDiv.style.display = "flex";
  } else if (newDiv?.style.display === "flex") {
    newDiv.style.display = "none";
  }

  // TODO : this is just a hack, need to refactor the entire content-scripts:
  if (hostname === "gemini.google.com" && iframeMountPointParent) {
    if (iframeMountPointParent.style.width === "calc(100% - 250px)") {
      iframeMountPointParent.style.width = "100%";
    } else if (iframeMountPointParent.style.width === "100%") {
      iframeMountPointParent.style.width = "calc(100% - 250px)";
    }
  }
};

const isProviderEnabled = async (provider: ChatProvider) => {
  // The empty array just for error handling
  const providers =
    ((await getLocalStorageValue("providers")) as SupportedProviders) || [];

  const providerInfo = providers.find((p) => p.name === provider);

  return hostname === providerInfo?.hostname && providerInfo.enabled;
};

const injectIframe = async () => {
  if (await isProviderEnabled("chat-gpt")) {
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

      const listener = new Listener("chat-gpt");
      listener.listen();
    }
  }

  if (await isProviderEnabled("poe")) {
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

      const listener = new Listener("poe");
      listener.listen();
    }
  }

  if (await isProviderEnabled("claude")) {
    // @ts-ignore
    newDiv.style =
      "width:250px;height:100%;right:0;position:fixed;top:60px;display:flex;z-index:50;";

    iframeMountPointParent = document.querySelector("body");

    if (iframeMountPointParent) {
      iframeMountPointParent.append(newDiv);

      iframe.src = iframeUrl;
      // @ts-ignore
      iframe.style =
        "width: 100%; height: 100%; border: none!important; outline:none!important;overflow:auto;padding-bottom:60px;";

      newDiv.append(iframe);

      const listener = new Listener("claude");
      listener.listen();
    }
  }

  if (await isProviderEnabled("perplexity")) {
    // @ts-ignore
    newDiv.style =
      "position:sticky;top:0;right:0;width:auto;height:100vh;display:flex;";

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

      const listener = new Listener("perplexity");
      listener.listen();
    }
  }

  if (await isProviderEnabled("gemini")) {
    iframeMountPointParent = document.querySelector("body > chat-app");

    if (iframeMountPointParent) {
      iframeMountPointParent.style.display = "flex";
      iframeMountPointParent.style.width = "calc(100% - 250px)";

      // @ts-ignore
      newDiv.style =
        "position:fixed;top:64px;right:0;width:250px;height:100vh;display:flex;z-index:2147483647";

      iframeMountPointParent.append(newDiv);

      iframe.src = iframeUrl;
      // @ts-ignore
      iframe.style =
        "width: 100%; height: 100%; border: none!important; outline:none!important;";

      newDiv.append(iframe);

      const listener = new Listener("gemini");
      listener.listen();
    }
  }
};

injectIframe();
injectTogglerButton();

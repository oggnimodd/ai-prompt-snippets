import { extensionUrl } from "utils/chrome";
import { getLocalStorageValue } from "utils/storage";
import Listener from "./listener";
import type {
  ChatHost,
  ChatProvider,
  SupportedProviders,
} from "models/provider";
import type { IframeMessage } from "utils/message";
import { isDev } from "scripts/utils";
import browser from "webextension-polyfill";
import { delay } from "utils/delay";

if (isDev) {
  const ws = new WebSocket("ws://localhost:8990");

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "reload") {
      // The if statement is to avoid 'Extension context invalidated' error
      // One call of this sendMessage is enough to do the HMR
      // But since we are reloading the runtime,
      // some content scripts will send the message when the context is already invalidated
      if (browser.runtime?.id) {
        browser.runtime.sendMessage({ type: "reload" });
      }
      window.location.reload();
    }
  };
}

// TODO : create a new injectable css to handle all the styling

const newDiv = document.createElement("div");
newDiv.style.display = "flex";
const hostname = window.location.hostname as ChatHost;
let iframeMountPointParent: HTMLElement | null;
const iframeUrl = `${extensionUrl}/dist/iframe/index.html`;
const iframe = document.createElement("iframe");
let togglerButton: HTMLButtonElement | null = null;

const injectTogglerButton = () => {
  const img = document.createElement("img");
  img.style.width = "30px";
  img.style.height = "30px";
  img.src = `${extensionUrl}/assets/images/icon.svg`;

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
    await delay(1000);

    iframeMountPointParent = document.querySelector("div:has(> main)");

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
    await delay(1000);

    // create div tag with 200px width
    newDiv.style.width = "250px";
    newDiv.style.height = "100%";

    iframeMountPointParent = document.querySelector(
      "[class*='SidebarLayout_layoutWrapper']",
    );

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
    await delay(1200);

    // @ts-ignore
    newDiv.style =
      "position:sticky;top:0;right:0;width:auto;height:100vh;display:flex;";

    iframeMountPointParent = document.querySelector("main > div > div");

    if (iframeMountPointParent) {
      iframeMountPointParent.append(newDiv);

      iframe.src = iframeUrl;
      // @ts-ignore
      iframe.style =
        "width: 100%; height: 100%; border: none!important; outline:none!important;";

      newDiv.append(iframe);

      const listener = new Listener("perplexity");
      listener.listen();

      const promptField =
        (document.querySelector(
          "textarea[placeholder*='follow']",
        ) as HTMLTextAreaElement) ||
        (document.querySelector(
          "textarea[placeholder*='nything']",
        ) as HTMLTextAreaElement);

      // Currently perplexity will automatically focus on the prompt field if we click inside iframe
      // We need to manually enable/disable depending on focus/blur of the main window
      window.addEventListener("focus", () => {
        promptField.disabled = false;
        promptField.focus();
      });

      window.addEventListener("blur", () => {
        promptField.disabled = true;
      });

      // If we focus on the iframe the prompt field is disabled, meaning user will need to click twice to focus on it, we can improve the ux by automatically focusing on the prompt field
      promptField.onclick = () => {
        promptField.focus();
      };
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

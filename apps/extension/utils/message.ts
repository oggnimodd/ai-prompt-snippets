type IframeMessageType = "ENTER_PROMPT" | "TOGGLE_IFRAME";

export interface PromptData {
  prompt: string;
}

export interface IframeMessage<T> {
  type: IframeMessageType;
  message?: T | null;
}

export const messageIframeParent = <T>({ type, message }: IframeMessage<T>) => {
  window.parent.postMessage(
    {
      type,
      message,
    },
    "*",
  );
};

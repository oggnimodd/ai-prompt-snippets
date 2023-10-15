export type ChatProvider = "chat-gpt" | "poe" | "claude" | "perplexity";
export type ChatHost =
  | "chat.openai.com"
  | "poe.com"
  | "claude.ai"
  | "www.perplexity.ai";

export interface Provider {
  name: ChatProvider;
  hostname: ChatHost;
}

export type SupportedProviders = Provider[];

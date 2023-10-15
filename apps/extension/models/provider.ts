export type ChatProvider = "chat-gpt" | "poe" | "claude" | "perplexity";
export type ChatHost =
  | "chat.openai.com"
  | "poe.com"
  | "claude.ai"
  | "www.perplexity.ai";

export interface ProviderInfo {
  name: ChatProvider;
  hostname: ChatHost;
  enabled: boolean;
}

export type SupportedProviders = ProviderInfo[];

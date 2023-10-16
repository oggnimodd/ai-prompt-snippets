export type ChatProvider =
  | "chat-gpt"
  | "poe"
  | "claude"
  | "perplexity"
  | "bard";
export type ChatHost =
  | "chat.openai.com"
  | "poe.com"
  | "claude.ai"
  | "www.perplexity.ai"
  | "bard.google.com";

export interface ProviderInfo {
  name: ChatProvider;
  hostname: ChatHost;
  enabled: boolean;
}

export type SupportedProviders = ProviderInfo[];

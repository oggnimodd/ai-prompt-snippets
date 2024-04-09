export type ChatProvider =
  | "chat-gpt"
  | "poe"
  | "claude"
  | "perplexity"
  | "bard"
  | "gemini";
export type ChatHost =
  | "chat.openai.com"
  | "poe.com"
  | "claude.ai"
  | "www.perplexity.ai"
  | "bard.google.com"
  | "gemini.google.com";

export interface ProviderInfo {
  name: ChatProvider;
  hostname: ChatHost;
  enabled: boolean;
}

export type SupportedProviders = ProviderInfo[];

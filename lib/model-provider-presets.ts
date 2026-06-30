export type ModelProviderApi =
  | "openai-completions"
  | "openai-responses"
  | "anthropic-messages"
  | "google-generative-ai";

export interface ModelProviderPreset {
  id: string;
  aliases: string[];
  label: string;
  api: ModelProviderApi;
  baseUrl: string;
  recommendedModel?: string;
  requiresApiKey: boolean;
}

export const MODEL_PROVIDER_PRESETS: ModelProviderPreset[] = [
  {
    id: "deepseek",
    aliases: ["deepseek"],
    label: "DeepSeek",
    api: "openai-completions",
    baseUrl: "https://api.deepseek.com/v1",
    recommendedModel: "deepseek-chat",
    requiresApiKey: true,
  },
  {
    id: "openai",
    aliases: ["openai"],
    label: "OpenAI",
    api: "openai-completions",
    baseUrl: "https://api.openai.com/v1",
    recommendedModel: "gpt-5.4",
    requiresApiKey: true,
  },
  {
    id: "anthropic",
    aliases: ["anthropic", "claude"],
    label: "Anthropic",
    api: "anthropic-messages",
    baseUrl: "https://api.anthropic.com",
    recommendedModel: "claude-sonnet-4-6",
    requiresApiKey: true,
  },
  {
    id: "google",
    aliases: ["google", "gemini", "google/gemini"],
    label: "Google Gemini",
    api: "google-generative-ai",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    recommendedModel: "gemini-2.5-flash",
    requiresApiKey: true,
  },
  {
    id: "openrouter",
    aliases: ["openrouter"],
    label: "OpenRouter",
    api: "openai-completions",
    baseUrl: "https://openrouter.ai/api/v1",
    recommendedModel: "openai/gpt-5.4",
    requiresApiKey: true,
  },
  {
    id: "siliconflow",
    aliases: ["siliconflow", "silicon-flow", "silicon_flow"],
    label: "SiliconFlow",
    api: "openai-completions",
    baseUrl: "https://api.siliconflow.cn/v1",
    recommendedModel: "deepseek-ai/DeepSeek-V3",
    requiresApiKey: true,
  },
  {
    id: "moonshot",
    aliases: ["moonshot", "kimi", "moonshot/kimi"],
    label: "Moonshot Kimi",
    api: "openai-completions",
    baseUrl: "https://api.moonshot.cn/v1",
    recommendedModel: "kimi-k2-0711-preview",
    requiresApiKey: true,
  },
  {
    id: "doubao",
    aliases: ["doubao", "volcengine", "ark"],
    label: "Doubao",
    api: "openai-completions",
    baseUrl: "https://ark.cn-beijing.volces.com/api/v3",
    recommendedModel: "doubao-seed-1-6-250615",
    requiresApiKey: true,
  },
  {
    id: "ollama",
    aliases: ["ollama"],
    label: "Ollama",
    api: "openai-completions",
    baseUrl: "http://localhost:11434/v1",
    recommendedModel: "qwen2.5-coder:7b",
    requiresApiKey: false,
  },
  {
    id: "lmstudio",
    aliases: ["lmstudio", "lm-studio", "lm_studio"],
    label: "LM Studio",
    api: "openai-completions",
    baseUrl: "http://localhost:1234/v1",
    recommendedModel: "local-model",
    requiresApiKey: false,
  },
  {
    id: "custom-openai",
    aliases: ["custom-openai", "custom", "openai-compatible", "openai_compatible"],
    label: "Custom OpenAI-compatible",
    api: "openai-completions",
    baseUrl: "",
    requiresApiKey: true,
  },
];

export const SUPPORTED_MODEL_PROVIDER_APIS = new Set<ModelProviderApi>([
  "openai-completions",
  "openai-responses",
  "anthropic-messages",
  "google-generative-ai",
]);

function normalizeProviderId(providerId: string): string {
  return providerId.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getModelProviderPreset(providerId: string | undefined): ModelProviderPreset | undefined {
  if (!providerId) return undefined;
  const normalized = normalizeProviderId(providerId);
  return MODEL_PROVIDER_PRESETS.find((preset) =>
    preset.id === normalized || preset.aliases.some((alias) => normalizeProviderId(alias) === normalized)
  );
}

export function isSupportedModelProviderApi(api: string | undefined): api is ModelProviderApi {
  return typeof api === "string" && SUPPORTED_MODEL_PROVIDER_APIS.has(api as ModelProviderApi);
}

export function providerAllowsMissingApiKey(providerId: string | undefined, api?: string): boolean {
  const preset = getModelProviderPreset(providerId);
  if (preset) return !preset.requiresApiKey;
  return api === "openai-completions" && providerId !== undefined && /^(ollama|lmstudio|lm-studio|local)$/i.test(providerId);
}

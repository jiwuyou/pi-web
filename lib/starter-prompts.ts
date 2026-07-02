import {
  CLAUDE_CODE_HANDOFF_PROMPT,
  OPENHOUSE_DOCS_DIR,
  OPENHOUSE_FIRST_CONFIG_PROMPT,
  OPENHOUSE_SCRIPTS_DIR,
} from "./openhouse-first-config-prompt";

export type StarterPrompt = {
  title: string;
  description: string;
  prompt: string;
};

export const STARTER_PROMPTS = [
  {
    title: "首次配置 OpenHouse",
    description: "读取文档、检查控制平面、按需后置安装工作能力",
    prompt: OPENHOUSE_FIRST_CONFIG_PROMPT,
  },
  {
    title: "配置 Claude Code",
    description: "按需安装 CloudCLI / Claude Code，并测通网页侧调用",
    prompt: `我要配置 CloudCLI 中的 Claude Code。它可能还没有安装，请先按文档检查真实状态；缺失时按脚本后置安装，再配置、修复和测试。

请先阅读并参考这些文档：
- ${OPENHOUSE_DOCS_DIR}/cloudcli-claude-code-setup.md
- ${OPENHOUSE_DOCS_DIR}/model-config-migration.md
- ${OPENHOUSE_DOCS_DIR}/service-manager.md
- ${OPENHOUSE_DOCS_DIR}/github-network-mirrors.md

需要安装时，请优先使用并检查这些脚本：
- ${OPENHOUSE_SCRIPTS_DIR}/install-claude-code.sh
- ${OPENHOUSE_SCRIPTS_DIR}/install-cloudcli.sh
- ${OPENHOUSE_SCRIPTS_DIR}/check-ai-tools.sh

请优先读取 pi-web 已保存并测通的模型配置。不要在回复里明文输出 API key、token 或 authorization header。如果仍缺少必要信息，请让我补齐：
- URL 或 base URL
- key/token
- model id
- 协议类型或 provider

要求：
1. 先确认 service-manager、pi-web、pi-agent 这些控制平面可用，不要把 CloudCLI 缺失误判为 OpenHouse 首装失败。
2. 缺失 CloudCLI / Claude Code 时，按脚本安装；已有时做真实可用性检查，不要只看目录存在。
3. 按文档检查和修复 agent.js 的模式配置。
4. 注意 OpenHouse 项目运行在 root，CloudCLI / Claude Code 的权限模式必须按文档处理。
5. DeepSeek 等 provider 可能同一个密钥对应不同协议，不能只复制 key；要确认 CloudCLI / Claude Code 实际支持的协议和 endpoint。
6. 测通目标是 CloudCLI 中的 Claude Code 网页侧调用，不是只测 Claude Code CLI。
7. 如果配置失败，或文档没有覆盖当前情况，请使用联网搜索工具检索最新方法后继续修复。
8. 配置成功后提醒我：通过 OpenHouse 菜单进入 cc/codex，也就是 CloudCLI / Claude Code 页面；默认账号密码如果仍是文档中的本机默认值，仅限本机使用，后续可以修改密码；进入后选择默认模型。`,
  },
  {
    title: "安装和配置 Hermes",
    description: "可选高级能力，会花很久；使用 uv 独立环境",
    prompt: `请帮我安装和配置 Hermes。这是可选高级能力，预计会花比较久，不影响 OpenHouse、pi-agent、Claude Code 的基础使用。

请先阅读并参考这些文档：
- ${OPENHOUSE_DOCS_DIR}/hermes-setup.md
- ${OPENHOUSE_DOCS_DIR}/workbench-options.md
- ${OPENHOUSE_DOCS_DIR}/service-manager.md
- ${OPENHOUSE_DOCS_DIR}/github-network-mirrors.md

需要安装时，请优先使用并检查这些脚本：
- ${OPENHOUSE_SCRIPTS_DIR}/install-hermes.sh
- ${OPENHOUSE_SCRIPTS_DIR}/check-ai-tools.sh

要求：
1. 使用 https://github.com/nesquena/hermes-webui。
2. Hermes 可以作为用户自选工作台之一，不是 OpenHouse 的必装组件。
3. Hermes 必须运行在 uv 构建的独立环境里，不要污染 OpenHouse 主 Node/Python 环境。
4. 完成安装、启动、停止、service-manager 注册和卸载说明。
5. 如果安装或配置失败，请使用联网搜索工具检索最新方法后继续排查。
6. 每一步先说明影响，再执行命令。`,
  },
  {
    title: "熟悉 OpenHouse 整个系统",
    description: "理解服务、运行控制、文档、终端和修复入口",
    prompt: `请带我熟悉 OpenHouse 整个系统。

请先阅读并参考这些文档：
- ${OPENHOUSE_DOCS_DIR}/openhouse-overview.md
- ${OPENHOUSE_DOCS_DIR}/workbench-options.md
- ${OPENHOUSE_DOCS_DIR}/service-manager.md
- ${OPENHOUSE_DOCS_DIR}/terminal-profiles.md
- ${OPENHOUSE_DOCS_DIR}/troubleshooting.md

请说明：
1. SmallPhone、pi-agent、cc/codex 这几个一级服务分别做什么；如果 cc/codex 尚未安装，应说明它是后置能力。
2. service-manager 为什么是安装完成后的控制中枢。
3. 运行控制如何查看状态、启动、关闭和修复服务。
4. 为什么一般不需要直接使用终端，以及什么时候需要看终端详细教学。
5. 为什么 pi-agent 主要负责首次配置和文档索引，主工作台可以由用户选择，例如 Claude Code、Hermes Web、Codex 或用户喜欢的其他开源项目。
6. 如果服务异常，应该先看哪些状态，再做哪些修复。`,
  },
  {
    title: "交给 Claude Code",
    description: "复制给 Claude Code，让它先阅读 OpenHouse 文档",
    prompt: CLAUDE_CODE_HANDOFF_PROMPT,
  },
] satisfies readonly StarterPrompt[];

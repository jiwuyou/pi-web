import { getOpenHouseDocsDir, getOpenHouseScriptsDir } from "./runtime-paths";

export const OPENHOUSE_DOCS_DIR = getOpenHouseDocsDir();
export const OPENHOUSE_SCRIPTS_DIR = getOpenHouseScriptsDir();

export const OPENHOUSE_PRIORITY_DOCS = [
  `${OPENHOUSE_DOCS_DIR}/openhouse-overview.md`,
  `${OPENHOUSE_DOCS_DIR}/pi-agent-first-use.md`,
  `${OPENHOUSE_DOCS_DIR}/model-config-migration.md`,
  `${OPENHOUSE_DOCS_DIR}/cloudcli-claude-code-setup.md`,
  `${OPENHOUSE_DOCS_DIR}/service-manager.md`,
  `${OPENHOUSE_DOCS_DIR}/troubleshooting.md`,
] as const;

const priorityDocsList = OPENHOUSE_PRIORITY_DOCS.map((path) => `- ${path}`).join("\n");

export const CLAUDE_CODE_HANDOFF_PROMPT = `请先阅读 OpenHouse 的内置文档，了解这个产品的能力、架构和使用方式。

文档目录：
${OPENHOUSE_DOCS_DIR}

请优先查看：
${priorityDocsList}

阅读后记住这些文档有什么用，什么时候去阅读这些文档，这些文档在哪里。再和我聊天。`;

export const OPENHOUSE_FIRST_CONFIG_PROMPT = `请帮我完成 OpenHouse 的首次配置。你这次是首次配置助手和文档索引员，目标是把控制平面和用户选择的工作能力配置到可用状态；不要把 pi-agent 说成唯一主工作台，用户之后可以选择 Claude Code、Codex、Hermes Web，或让 AI 搜索、安装和改造其他开源项目作为自己的工作台。

第一步，请先阅读 OpenHouse 的内置文档，了解这个产品的能力、架构和使用方式。

文档目录：
${OPENHOUSE_DOCS_DIR}

请优先查看：
${priorityDocsList}

阅读后记住这些文档有什么用，什么时候去阅读这些文档，这些文档在哪里。再和我聊天。

同时根据需要查看：
- ${OPENHOUSE_DOCS_DIR}/workbench-options.md
- ${OPENHOUSE_DOCS_DIR}/terminal-profiles.md
- ${OPENHOUSE_DOCS_DIR}/browser-and-webview.md
- ${OPENHOUSE_DOCS_DIR}/github-network-mirrors.md
- ${OPENHOUSE_DOCS_DIR}/android-control-shizuku.md

后置能力说明：
- Codex / Claude Code / CloudCLI / Hermes 可能还没有安装，它们不是首次安装主链路的必经项。
- 需要这些能力时，请按 ${OPENHOUSE_SCRIPTS_DIR} 下的安装脚本和 ${OPENHOUSE_DOCS_DIR} 下的文档引导用户后置安装、配置、检查和修复。
- 常用脚本入口包括：${OPENHOUSE_SCRIPTS_DIR}/install-codex.sh、${OPENHOUSE_SCRIPTS_DIR}/install-claude-code.sh、${OPENHOUSE_SCRIPTS_DIR}/install-cloudcli.sh、${OPENHOUSE_SCRIPTS_DIR}/install-hermes.sh、${OPENHOUSE_SCRIPTS_DIR}/check-ai-tools.sh。
- 不要因为找不到 codex、claude、cloudcli 或 hermes 命令就判定 OpenHouse 首次安装失败；先检查 service-manager、pi-web、pi-agent 这些控制平面是否可用，再引导安装缺失能力。

配置目标：
1. 先确认 service-manager、pi-web、pi-agent 的基础状态；如异常，按文档修复控制平面。
2. 读取当前 pi-web 已经测通的大模型配置，理解 provider、base URL、协议类型、model id、headers 和密钥来源。
3. 不要在回复、日志摘要或错误信息里明文输出 API key、token、authorization header 或其他密钥。需要说明时只用脱敏形式。
4. 询问用户是否需要安装或配置 Codex / Claude Code / CloudCLI / Hermes。需要时，按文档和 ${OPENHOUSE_SCRIPTS_DIR} 中的脚本执行；脚本应可重复执行，失败后继续检查真实可用性。
5. 需要迁移模型配置时，把 pi-web 的配置正确迁移到目标工具；注意同一个 provider 可能有多种协议。DeepSeek 等 provider 可能同一个密钥可以用于 OpenAI-compatible Chat、Responses 或其他代理协议，但不能简单照抄；请按文档和目标工具实际支持的协议正确配置。
6. 如果文档没有覆盖当前 provider、协议或版本，请主动联网搜索。优先查官方文档、项目 README、GitHub issue、release note；GitHub 访问失败或很慢时，可以使用镜像或备用源，但要核对来源和风险。
7. 如文档要求，请检查并修复 CloudCLI / Claude Code 相关的 agent.js 模式配置，尤其注意 OpenHouse 项目运行在 root，CloudCLI 的 Claude Code 权限模式可能需要按文档配置。
8. 如果安装或重启了 CloudCLI 相关服务，必须测通 CloudCLI 中的 Claude Code 网页侧调用；不要只测试命令行存在。
9. 配置完成后，再用简短方式介绍 OpenHouse 的基本使用方法：服务菜单、service-manager、pi-agent、cc/codex、Codex、终端、内置浏览器、文档目录和排障入口。
10. 最后把下面这段文本给用户，建议用户复制到 Claude Code 或其他主工作台里继续使用：

${CLAUDE_CODE_HANDOFF_PROMPT}`;

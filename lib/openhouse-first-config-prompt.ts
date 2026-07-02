export const OPENHOUSE_DOCS_DIR = "/root/openhouse/docs";

export const OPENHOUSE_PRIORITY_DOCS = [
  `${OPENHOUSE_DOCS_DIR}/PRODUCT_OVERVIEW.md`,
  `${OPENHOUSE_DOCS_DIR}/OPENHOUSE_FIRST_CONFIGURATION.md`,
  `${OPENHOUSE_DOCS_DIR}/MODEL_API_SETUP.md`,
  `${OPENHOUSE_DOCS_DIR}/CLOUDCLI_CLAUDE_CODE.md`,
  `${OPENHOUSE_DOCS_DIR}/SERVICE_MANAGER.md`,
  `${OPENHOUSE_DOCS_DIR}/RECOVERY.md`,
] as const;

const priorityDocsList = OPENHOUSE_PRIORITY_DOCS.map((path) => `- ${path}`).join("\n");

export const CLAUDE_CODE_HANDOFF_PROMPT = `请先阅读 OpenHouse 的内置文档，了解这个产品的能力、架构和使用方式。

文档目录：
${OPENHOUSE_DOCS_DIR}

请优先查看：
${priorityDocsList}

阅读后，请记住这些文档的位置、用途，以及在什么场景下应该回到对应文档查证。之后再和我继续聊天；如果我的问题涉及 OpenHouse 的能力、配置、服务控制、模型迁移或排障，请优先参考这些文档。`;

export const OPENHOUSE_FIRST_CONFIG_PROMPT = `请帮我完成 OpenHouse 的首次配置。你这次是首次配置助手和文档索引员，目标是把系统配置到可用状态；不要把 pi-agent 说成唯一主工作台，用户之后可以选择 Claude Code、Codex、Hermes Web，或让 AI 搜索、安装和改造其他开源项目作为自己的工作台。

第一步，请先阅读 OpenHouse 内置文档：
${priorityDocsList}

同时根据需要查看：
- ${OPENHOUSE_DOCS_DIR}/START_HERE.md
- ${OPENHOUSE_DOCS_DIR}/CAPABILITIES_MAP.md
- ${OPENHOUSE_DOCS_DIR}/WORKBENCH_OPTIONS.md
- ${OPENHOUSE_DOCS_DIR}/TERMINAL_PROFILES.md
- ${OPENHOUSE_DOCS_DIR}/BROWSER_AND_WEBVIEW.md
- ${OPENHOUSE_DOCS_DIR}/GITHUB_NETWORK_MIRRORS.md
- ${OPENHOUSE_DOCS_DIR}/ANDROID_CONTROL_SHIZUKU.md

配置目标：
1. 读取当前 pi-web 已经测通的大模型配置，理解 provider、base URL、协议类型、model id、headers 和密钥来源。
2. 不要在回复、日志摘要或错误信息里明文输出 API key、token、authorization header 或其他密钥。需要说明时只用脱敏形式。
3. 把 pi-web 模型配置迁移到 CloudCLI / Claude Code 可用的配置中。
4. 注意同一个 provider 可能有多种协议。DeepSeek 等 provider 可能同一个密钥可以用于 OpenAI-compatible Chat、Responses 或其他代理协议，但不能简单照抄；请按文档和实际 CloudCLI / Claude Code 支持的协议正确配置。
5. 如果文档没有覆盖当前 provider、协议或版本，请主动联网搜索。优先查官方文档、项目 README、GitHub issue、release note；GitHub 访问失败或很慢时，可以使用镜像或备用源，但要核对来源和风险。
6. 如文档要求，请检查并修复 CloudCLI / Claude Code 相关的 agent.js 模式配置，尤其注意 OpenHouse 项目运行在 root，CloudCLI 的 Claude Code 权限模式可能需要按文档配置。
7. 启动或重启 CloudCLI 相关服务后，必须测通 CloudCLI 中的 Claude Code 网页侧调用；不要只测试命令行存在。
8. 测通后，再用简短方式介绍 OpenHouse 的基本使用方法：服务菜单、service-manager、cc/codex、Codex、终端、内置浏览器、文档目录和排障入口。
9. 最后把下面这段文本给用户，建议用户复制到 Claude Code 里继续使用：

${CLAUDE_CODE_HANDOFF_PROMPT}`;

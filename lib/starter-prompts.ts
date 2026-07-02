export type StarterPrompt = {
  title: string;
  description: string;
  prompt: string;
};

const OFFICIAL_DOCS_DIR = "/root/openhouseai-docs/official";

export const STARTER_PROMPTS = [
  {
    title: "首次使用",
    description: "选择项目、配置模型、新建会话，先把 pi-agent 用起来",
    prompt: `请带我完成 pi-agent 的首次使用。

请先阅读并参考这些文档：
- ${OFFICIAL_DOCS_DIR}/START_HERE.md
- ${OFFICIAL_DOCS_DIR}/AI_AGENT_REFERENCE.md

目标：
1. 确认当前项目目录是否适合使用，默认目录是 /root。
2. 引导我在侧边栏选择项目。
3. 引导我在底部模型入口配置或切换模型。
4. 新建一个会话并发送第一个任务。
5. 说明 pi-agent 是 OpenHouse 菜单里的一级服务，和 SmallPhone、cc/codex 同级。

请用简短步骤推进，不要一次输出很长的说明。`,
  },
  {
    title: "配置 Claude Code",
    description: "配置 CloudCLI 中的 Claude Code，并测通网页侧调用",
    prompt: `我要配置 CloudCLI 中的 Claude Code。请按文档执行配置、修复和测试。

请先阅读并参考这些文档：
- ${OFFICIAL_DOCS_DIR}/CLOUDCLI_CLAUDE_CODE.md
- ${OFFICIAL_DOCS_DIR}/MODEL_API_SETUP.md
- ${OFFICIAL_DOCS_DIR}/AI_AGENT_REFERENCE.md

我第一次消息需要提供这些信息；如果缺少任何一项，请先让我补齐：
- URL:
- key/token:
- model id:

要求：
1. 由 pi-agent 按文档检查和修复 agent.js 的模式配置。
2. 注意 CloudCLI 的权限模型是 bypasspermissions，而 OpenHouse 项目运行在 root。
3. 测通目标是 CloudCLI 中的 Claude Code，不是只测 Claude Code CLI。
4. 如果配置失败，或文档没有覆盖当前情况，请使用联网搜索工具检索最新方法后继续修复。
5. 配置成功后提醒我：通过 OpenHouse 菜单进入 cc/codex，也就是 CloudCLI / Claude Code 页面；默认账号密码是 admin / 123456，仅限本机使用，后续可以修改密码；进入后选择默认模型。`,
  },
  {
    title: "安装和配置 Hermes",
    description: "可选高级能力，会花很久；使用 uv 独立环境",
    prompt: `请帮我安装和配置 Hermes。这是可选高级能力，预计会花比较久，不影响 OpenHouse、pi-agent、Claude Code 的基础使用。

请先阅读并参考这些文档：
- ${OFFICIAL_DOCS_DIR}/HERMES_SETUP.md
- ${OFFICIAL_DOCS_DIR}/OPTIONAL_EXTERNAL_TOOLS.md
- ${OFFICIAL_DOCS_DIR}/SERVICE_MANAGER.md

要求：
1. 使用 https://github.com/nesquena/hermes-webui。
2. Hermes 必须运行在 uv 构建的独立环境里，不要污染 OpenHouse 主 Node/Python 环境。
3. 完成安装、启动、停止、service-manager 注册和卸载说明。
4. 如果安装或配置失败，请使用联网搜索工具检索最新方法后继续排查。
5. 每一步先说明影响，再执行命令。`,
  },
  {
    title: "熟悉 OpenHouse 整个系统",
    description: "理解服务、运行控制、文档、终端和修复入口",
    prompt: `请带我熟悉 OpenHouse 整个系统。

请先阅读并参考这些文档：
- ${OFFICIAL_DOCS_DIR}/PRODUCT_OVERVIEW.md
- ${OFFICIAL_DOCS_DIR}/SERVICE_MANAGER.md
- ${OFFICIAL_DOCS_DIR}/RECOVERY.md
- ${OFFICIAL_DOCS_DIR}/TERMINAL_PROFILES.md

请说明：
1. SmallPhone、pi-agent、cc/codex 这几个一级服务分别做什么。
2. service-manager 为什么是安装完成后的控制中枢。
3. 运行控制如何查看状态、启动、关闭和修复服务。
4. 为什么一般不需要直接使用终端，以及什么时候需要看终端详细教学。
5. 如果服务异常，应该先看哪些状态，再做哪些修复。`,
  },
] satisfies readonly StarterPrompt[];

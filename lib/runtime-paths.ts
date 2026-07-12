import { homedir } from "os";
import { isAbsolute, join, resolve } from "path";

function expandHome(value: string): string {
  if (value === "~") return homedir();
  if (value.startsWith("~/")) return join(homedir(), value.slice(2));
  return value;
}

export function getOpenHouseDefaultCwd(): string {
  const configured = process.env.OPENHOUSE_PI_WEB_DEFAULT_CWD?.trim();
  if (!configured) return homedir();
  const expanded = expandHome(configured);
  return isAbsolute(expanded) ? expanded : resolve(expanded);
}

export function getOpenHouseDocsDir(): string {
  return process.env.OPENHOUSE_DOCS_DIR?.trim() || join(homedir(), "openhouse", "docs");
}

export function getOpenHouseScriptsDir(): string {
  return process.env.OPENHOUSE_SCRIPTS_DIR?.trim() || join(homedir(), "openhouse", "scripts");
}

export function getOpenHouseFirstConfigStatePath(): string {
  return process.env.OPENHOUSE_FIRST_CONFIG_STATE_PATH?.trim()
    || join(homedir(), ".config", "openhouseai", "first-config.json");
}

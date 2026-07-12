import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname } from "path";
import { getOpenHouseFirstConfigStatePath } from "./runtime-paths";

export const OPENHOUSE_FIRST_CONFIG_STATE_PATH =
  getOpenHouseFirstConfigStatePath();

export type OpenHouseFirstConfigState = {
  started: boolean;
  completed: boolean;
  startedAt?: string;
  completedAt?: string;
  updatedAt?: string;
};

type StatePatch = {
  started?: boolean;
  completed?: boolean;
  reset?: boolean;
};

const DEFAULT_STATE: OpenHouseFirstConfigState = {
  started: false,
  completed: false,
};

function normalizeState(value: unknown): OpenHouseFirstConfigState {
  if (!value || typeof value !== "object") return { ...DEFAULT_STATE };
  const record = value as Record<string, unknown>;
  const completed = record.completed === true;
  const started = completed || record.started === true;

  return {
    started,
    completed,
    ...(typeof record.startedAt === "string" ? { startedAt: record.startedAt } : {}),
    ...(typeof record.completedAt === "string" ? { completedAt: record.completedAt } : {}),
    ...(typeof record.updatedAt === "string" ? { updatedAt: record.updatedAt } : {}),
  };
}

export async function readOpenHouseFirstConfigState(): Promise<OpenHouseFirstConfigState> {
  try {
    const raw = await readFile(OPENHOUSE_FIRST_CONFIG_STATE_PATH, "utf8");
    return normalizeState(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export async function writeOpenHouseFirstConfigState(patch: StatePatch): Promise<OpenHouseFirstConfigState> {
  const now = new Date().toISOString();
  const current = patch.reset ? { ...DEFAULT_STATE } : await readOpenHouseFirstConfigState();
  const next: OpenHouseFirstConfigState = {
    ...current,
    updatedAt: now,
  };

  if (patch.started !== undefined) {
    next.started = patch.started;
    if (patch.started && !next.startedAt) next.startedAt = now;
    if (!patch.started) delete next.startedAt;
  }

  if (patch.completed !== undefined) {
    next.completed = patch.completed;
    if (patch.completed) {
      next.started = true;
      if (!next.startedAt) next.startedAt = now;
      next.completedAt = now;
    } else {
      delete next.completedAt;
    }
  }

  await mkdir(dirname(OPENHOUSE_FIRST_CONFIG_STATE_PATH), { recursive: true });
  await writeFile(OPENHOUSE_FIRST_CONFIG_STATE_PATH, `${JSON.stringify(next, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  return next;
}

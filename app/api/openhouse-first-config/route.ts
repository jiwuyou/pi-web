import { NextResponse } from "next/server";
import { OPENHOUSE_FIRST_CONFIG_PROMPT } from "@/lib/openhouse-first-config-prompt";
import {
  readOpenHouseFirstConfigState,
  writeOpenHouseFirstConfigState,
  type OpenHouseFirstConfigState,
} from "@/lib/openhouse-first-config-state";

type FirstConfigAction = "start" | "started" | "complete" | "completed" | "reset";

type FirstConfigRequest = {
  action?: FirstConfigAction;
  started?: boolean;
  completed?: boolean;
};

function readBooleanPatch(body: FirstConfigRequest): {
  started?: boolean;
  completed?: boolean;
  reset?: boolean;
  includePrompt?: boolean;
} {
  switch (body.action) {
    case "start":
    case "started":
      return { started: true, includePrompt: true };
    case "complete":
    case "completed":
      return { started: true, completed: true };
    case "reset":
      return { reset: true };
    default:
      return {
        ...(typeof body.started === "boolean" ? { started: body.started } : {}),
        ...(typeof body.completed === "boolean" ? { completed: body.completed } : {}),
      };
  }
}

export async function GET() {
  try {
    const state = await readOpenHouseFirstConfigState();
    return NextResponse.json({ state });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as FirstConfigRequest;
    const { includePrompt, ...patch } = readBooleanPatch(body);
    const state: OpenHouseFirstConfigState = await writeOpenHouseFirstConfigState(patch);
    return NextResponse.json({
      state,
      ...(includePrompt ? { prompt: OPENHOUSE_FIRST_CONFIG_PROMPT } : {}),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

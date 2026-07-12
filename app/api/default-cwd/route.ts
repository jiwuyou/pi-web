import { NextResponse } from "next/server";
import { mkdirSync } from "fs";
import { allowFileRoot } from "@/lib/file-access";
import { getOpenHouseDefaultCwd } from "@/lib/runtime-paths";

async function resolveDefaultCwd() {
  try {
    const defaultCwd = getOpenHouseDefaultCwd();
    mkdirSync(defaultCwd, { recursive: true });
    allowFileRoot(defaultCwd);
    return NextResponse.json({ cwd: defaultCwd });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// GET/POST /api/default-cwd
// Returns the configured OpenHouse project directory, falling back to os.homedir().
export const GET = resolveDefaultCwd;
export const POST = resolveDefaultCwd;

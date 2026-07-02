import { NextResponse } from "next/server";
import { mkdirSync } from "fs";
import { allowFileRoot } from "@/lib/file-access";

const DEFAULT_CWD = "/root";

// POST /api/default-cwd
// Returns the Ubuntu root user's home directory used by OpenHouse/pi-agent.
export async function POST() {
  try {
    mkdirSync(DEFAULT_CWD, { recursive: true });
    allowFileRoot(DEFAULT_CWD);
    return NextResponse.json({ cwd: DEFAULT_CWD });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

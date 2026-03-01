import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET() {
  try {
    const command = process.platform === "win32" ? "cd" : "dir";
    const { stdout, stderr } = await execPromise(command);
    if (stderr) return NextResponse.json({ error: stderr }, { status: 500 });

    const path = stdout.trim();
    return NextResponse.json({ path });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

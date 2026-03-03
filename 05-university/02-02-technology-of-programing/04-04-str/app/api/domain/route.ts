import { NextResponse } from "next/server";
import { domainProcessor } from "@/lib/domainProcessor";
import fs from "fs";
import path from "path";

export async function GET() {
  const results = domainProcessor.processAllDomains();
  domainProcessor.saveResults(results);

  return NextResponse.json(results);
}

export async function POST(request: Request) {
  const { url } = await request.json();

  const dbPath = path.join(process.cwd(), "data", "domains.json");

  const data = await fs.promises.readFile(dbPath, "utf-8");
  const json = JSON.parse(data);

  json.domains.push(url);

  await fs.promises.writeFile(dbPath, JSON.stringify(json, null, 2));

  return NextResponse.json({ success: true, url });
}

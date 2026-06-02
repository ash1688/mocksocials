import { readFile } from "node:fs/promises";

import { getCurrentUser } from "@/lib/auth/session";
import { logPath } from "@/lib/log";

// Raw log download (PHP admin ?tab=logs&download=1). Admin only.
export async function GET() {
  const me = await getCurrentUser();
  if (!me || !me.isAdmin) {
    return new Response("Forbidden — admin only.", { status: 403 });
  }
  let body = "";
  try {
    body = await readFile(logPath(), "utf8");
  } catch {
    body = "";
  }
  const stamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="mocksocial-${stamp}.log"`,
    },
  });
}

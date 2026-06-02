import { appendFile, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

// Tab-separated activity log (PHP helpers.php log_event). One line per event:
//   ISO_TIMESTAMP \t LEVEL \t IP \t USER \t ACTION \t DETAIL
// Stored at <project>/logs/app.log (gitignored via *.log).

export function logPath(): string {
  return path.join(process.cwd(), "logs", "app.log");
}

const clean = (s: string) => String(s).replace(/[\t\r\n]+/g, " ");

export async function logEvent(
  action: string,
  detail = "",
  opts: { level?: string; actor?: string; ip?: string } = {},
): Promise<void> {
  const ts = new Date().toISOString().replace(/\.\d+Z$/, "");
  const line =
    [
      ts,
      (opts.level ?? "info").toUpperCase(),
      clean(opts.ip ?? "-"),
      clean(opts.actor ?? "-"),
      clean(action),
      clean(detail),
    ].join("\t") + "\n";
  try {
    await mkdir(path.dirname(logPath()), { recursive: true });
    await appendFile(logPath(), line, "utf8");
  } catch {
    // Logging must never break a request.
  }
}

export type LogLine = {
  ts: string;
  level: string;
  ip: string;
  user: string;
  action: string;
  detail: string;
};

/** Read the newest `limit` lines (optionally filtered), newest first. */
export async function readLog(
  limit = 500,
  filter = "",
): Promise<{ lines: LogLine[]; size: number }> {
  let size = 0;
  try {
    size = (await stat(logPath())).size;
  } catch {
    return { lines: [], size: 0 };
  }
  let raw: string;
  try {
    raw = await readFile(logPath(), "utf8");
  } catch {
    return { lines: [], size };
  }
  let all = raw.split("\n").filter((l) => l.trim() !== "");
  if (filter) {
    const f = filter.toLowerCase();
    all = all.filter((l) => l.toLowerCase().includes(f));
  }
  const slice = all.slice(-limit).reverse();
  const lines = slice.map((l) => {
    const p = l.split("\t");
    while (p.length < 6) p.push("");
    return {
      ts: p[0]!,
      level: p[1]!,
      ip: p[2]!,
      user: p[3]!,
      action: p[4]!,
      detail: p[5]!,
    };
  });
  return { lines, size };
}

export async function clearLog(): Promise<void> {
  try {
    await writeFile(logPath(), "", "utf8");
  } catch {
    // ignore
  }
}

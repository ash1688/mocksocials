// One-off: extract the 50 seed personas from the MySQL dump into a TS module.
// Run: node docs/extract-personas.mjs
import fs from "node:fs";

const lines = fs.readFileSync("docs/mocksocial_php.sql", "utf8").split(/\r?\n/);

// Find the fake_users INSERT, then read tuple lines until the terminating ';'.
const start = lines.findIndex((l) => l.startsWith("INSERT INTO `fake_users`"));
if (start < 0) throw new Error("fake_users insert not found");

const rows = [];
for (let i = start + 1; i < lines.length; i++) {
  let s = lines[i].trim();
  const done = s.endsWith(";");
  s = s.replace(/[,;]\s*$/, "");
  if (s.startsWith("(") && s.endsWith(")")) {
    s = s.slice(1, -1);
    const vals = [];
    let cur = "";
    let inStr = false;
    for (let j = 0; j < s.length; j++) {
      const c = s[j];
      if (inStr) {
        if (c === "\\") {
          // MySQL backslash escape: \' \" \\ \n etc. Keep the escaped char literal.
          const next = s[j + 1];
          const map = { n: "\n", t: "\t", r: "\r", "0": "\0" };
          cur += map[next] ?? next;
          j++;
        } else if (c === "'" && s[j + 1] === "'") {
          cur += "'";
          j++;
        } else if (c === "'") {
          inStr = false;
        } else {
          cur += c;
        }
      } else if (c === "'") {
        inStr = true;
      } else if (c === ",") {
        vals.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    vals.push(cur.trim());
    const f = (v) => (v === "NULL" ? null : v);
    // id, username, display_name, avatar_url, bio, cover_url, location, education, created_at
    rows.push({
      username: vals[1],
      displayName: vals[2],
      avatarUrl: f(vals[3]),
      bio: f(vals[4]),
      coverUrl: f(vals[5]),
      location: f(vals[6]),
      education: f(vals[7]),
    });
  }
  if (done) break;
}

const out =
  "// Auto-extracted from docs/mocksocial_php.sql — the 50 seed personas (PHP fake_users).\n" +
  "// These never log in; they author all seeded community content.\n" +
  "export type Persona = {\n  username: string;\n  displayName: string;\n  avatarUrl: string | null;\n  bio: string | null;\n  coverUrl: string | null;\n  location: string | null;\n  education: string | null;\n};\n\n" +
  "export const PERSONAS: Persona[] = " +
  JSON.stringify(rows, null, 2) +
  ";\n";
fs.writeFileSync("src/db/personas-data.ts", out);
console.log(`wrote ${rows.length} personas`);
console.log("jasmine:", JSON.stringify(rows.find((r) => r.username === "jasmine_obrien")));
console.log("isaac:", JSON.stringify(rows.find((r) => r.username === "isaac_bennett")));

import Link from "next/link";

const TABS: [string, string][] = [
  ["users", "Users"],
  ["seed", "Seed content"],
  ["groups", "Groups"],
  ["stats", "Stats"],
  ["notes", "Community Notes"],
  ["reset", "Reset tools"],
  ["sessions", "Sessions"],
  ["logs", "Logs"],
];

/** Faithful port of PHP admin_nav(). */
export function AdminNav({ active }: { active: string }) {
  return (
    <div className="admin-nav">
      {TABS.map(([k, label]) => (
        <Link key={k} className={k === active ? "active" : ""} href={`/admin?tab=${k}`}>
          {label}
        </Link>
      ))}
    </div>
  );
}

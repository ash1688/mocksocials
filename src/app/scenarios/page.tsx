import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { ScenarioPicker } from "@/components/scenario/scenario-picker";
import { listScenarios, getScenario } from "@/lib/scenario/registry";
import { pickForUser } from "@/lib/scenario/select";
import { getMyScenarioProgress } from "@/lib/scenario/queries";
import { getSetting, CLASS_DEMO_KEY } from "@/lib/settings";

type Status = "done" | "started" | "none";

function statusOf(answered: number, total: number): Status {
  if (total > 0 && answered >= total) return "done";
  if (answered > 0) return "started";
  return "none";
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "none") return null;
  const done = status === "done";
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 999,
        color: "#fff",
        background: done ? "#1c7a3e" : "#d98a1a",
      }}
    >
      {done ? "Completed" : "In progress"}
    </span>
  );
}

function actionLabel(status: Status): string {
  return status === "done" ? "Review" : status === "started" ? "Continue" : "Start";
}

export default async function ScenariosIndexPage() {
  const me = await requireUser();
  const all = listScenarios();
  const demoId = await getSetting(CLASS_DEMO_KEY);
  const demo = demoId ? getScenario(demoId) : null;
  const five = pickForUser(me.id, 5, demoId);
  const progress = await getMyScenarioProgress(me.id);

  return (
    <>
      <AppChrome user={me} />
      <main className="content" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h1 style={{ margin: 0 }}>Scenarios</h1>
          <p className="muted small" style={{ marginTop: 4 }}>
            Authored real-world cases. Work through the questions at the end of
            each one.
          </p>
        </div>

        {demo ? (
          <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <div className="muted small" style={{ letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>
              Class demo
            </div>
            <h2 style={{ margin: "6px 0 4px" }}>{demo.title}</h2>
            <p className="muted small" style={{ marginTop: 0 }}>
              {me.isAdmin
                ? "Present this one with the class."
                : "Your teacher will go through this in class — you can review it any time."}
            </p>
            <Link className="btn-twitter" href={`/scenario/${demo.id}`}>
              {me.isAdmin ? "Open demo" : "Review"}
            </Link>
          </div>
        ) : null}

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Your scenarios</h2>
          <p className="muted small">
            Five picked for you — do any of them, in any order.
          </p>
          {five.length === 0 ? (
            <p className="muted">More scenarios coming soon.</p>
          ) : (
            <>
              <ScenarioPicker
                items={five.map((s) => ({
                  id: s.id,
                  title: s.title,
                  done: statusOf(progress[s.id] ?? 0, s.taskCount) === "done",
                }))}
              />
              <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
                {five.map((s) => {
                  const status = statusOf(progress[s.id] ?? 0, s.taskCount);
                  return (
                    <li
                      key={s.id}
                      style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", flexWrap: "wrap" }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Link href={`/scenario/${s.id}`}>{s.title}</Link>
                        <StatusBadge status={status} />
                      </span>
                      <Link className="btn-outline" href={`/scenario/${s.id}`}>
                        {actionLabel(status)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>All scenarios</h2>
          <p className="muted small">
            Browse or review any of the {all.length} scenario
            {all.length === 1 ? "" : "s"}.
          </p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {all.map((s) => {
                const status = statusOf(progress[s.id] ?? 0, s.taskCount);
                return (
                  <tr key={s.id}>
                    <td>
                      <Link href={`/scenario/${s.id}`}>{s.title}</Link>
                      {demoId === s.id ? (
                        <span className="muted small"> · class demo</span>
                      ) : null}
                    </td>
                    <td>
                      <StatusBadge status={status} />
                    </td>
                    <td>
                      <Link href={`/scenario/${s.id}`}>{actionLabel(status)} →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

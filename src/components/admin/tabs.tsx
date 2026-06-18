import Link from "next/link";

import { prettyNumber, relativeTime } from "@/lib/format";
import { ConfirmButton } from "./confirm-button";
import * as A from "@/lib/admin/actions";
import type { LogLine } from "@/lib/log";
import { getScenario, getTask, listScenarios } from "@/lib/scenario/registry";

type UserRow = {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  isAdmin: boolean;
  lastActive: Date | null;
};
type Basic = { id: number; displayName: string; username: string };

const fmtDate = (d: Date | null) => (d ? d.toISOString().replace("T", " ").slice(0, 19) : "—");
const trim = (s: string | null, n: number) =>
  !s ? "" : s.length > n ? s.slice(0, n) + "…" : s;

export function UsersTab({ users, meId }: { users: UserRow[]; meId: number }) {
  return (
    <>
      <h2>Users</h2>
      <div className="card">
        <h3>Create student account</h3>
        <p className="muted small">
          Username = Student ID (digits only). Password is fixed to <code>Student26</code>.
        </p>
        <form action={A.createStudent}>
          <label>
            Student ID
            <input name="student_id" pattern="[0-9]{4,12}" placeholder="e.g. 19234156" required />
          </label>
          <label>
            Display name <span className="muted small">(optional)</span>
            <input name="display_name" placeholder='Defaults to "Student <id>"' />
          </label>
          <button className="btn-twitter">Create student</button>
        </form>
      </div>
      <div className="card">
        <h3>Create admin / custom user</h3>
        <form action={A.createUser}>
          <label>
            Username
            <input name="username" required />
          </label>
          <label>
            Display name
            <input name="display_name" required />
          </label>
          <label>
            Password
            <input name="password" required />
          </label>
          <label>
            Avatar URL
            <input name="avatar_url" placeholder="optional" />
          </label>
          <label className="checkbox">
            <input type="checkbox" name="is_admin" value="1" /> Admin
          </label>
          <button className="btn-outline">Create</button>
        </form>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Display</th>
            <th>Admin</th>
            <th>Last active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.displayName}</td>
              <td>{u.isAdmin ? "yes" : "no"}</td>
              <td>{fmtDate(u.lastActive)}</td>
              <td>
                <details>
                  <summary>Reset PW</summary>
                  <form action={A.resetPassword}>
                    <input type="hidden" name="user_id" value={u.id} />
                    <input name="password" placeholder="new password" required />
                    <div className="popover-actions">
                      <button>Reset</button>
                    </div>
                  </form>
                </details>
                <details>
                  <summary>Edit</summary>
                  <form action={A.updateUser}>
                    <input type="hidden" name="user_id" value={u.id} />
                    <label>
                      Display
                      <input name="display_name" defaultValue={u.displayName} />
                    </label>
                    <label>
                      Avatar URL
                      <input name="avatar_url" defaultValue={u.avatarUrl ?? ""} />
                    </label>
                    <label>
                      Bio
                      <textarea name="bio" defaultValue={u.bio ?? ""} />
                    </label>
                    <label className="checkbox">
                      <input type="checkbox" name="is_admin" value="1" defaultChecked={u.isAdmin} /> Admin
                    </label>
                    <div className="popover-actions">
                      <button>Save</button>
                    </div>
                  </form>
                </details>
                {u.id !== meId ? (
                  <form action={A.deleteUser} className="inline">
                    <input type="hidden" name="user_id" value={u.id} />
                    <ConfirmButton message="Delete user?" className="btn-danger">
                      Delete
                    </ConfirmButton>
                  </form>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function SeedTab({ users }: { users: Basic[] }) {
  return (
    <>
      <h2>Seed content</h2>
      <div className="card">
        <h3>Seed a single post</h3>
        <form action={A.seedPost}>
          <label>
            Post as
            <select name="user_id">
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.displayName} (@{u.username})
                </option>
              ))}
            </select>
          </label>
          <label>
            Platform
            <select name="platform">
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
          </label>
          <label>
            Content / description
            <textarea name="content" rows={3} />
          </label>
          <label>
            Image URL (Facebook / Instagram)
            <input name="image_url" />
          </label>
          <fieldset style={{ border: "1px solid var(--border)", borderRadius: 8, marginTop: 8 }}>
            <legend className="muted small">YouTube fields (ignored for other platforms)</legend>
            <label>
              YT title
              <input name="title" />
            </label>
            <label>
              YT thumbnail
              <input name="thumbnail_url" />
            </label>
            <label>
              YT duration
              <input name="duration" defaultValue="10:00" />
            </label>
            <label>
              Stats profile
              <select name="stats_profile" defaultValue="moderate">
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
                <option value="hyped">Hyped</option>
                <option value="viral">Viral</option>
              </select>
            </label>
          </fieldset>
          <button className="btn-twitter">Seed</button>
        </form>
      </div>
      <div className="card">
        <h3>Starter pack</h3>
        <p>Adds persona posts from the shared seed pool. Pick a platform or seed them all.</p>
        <form action={A.seedPack} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button name="platform" value="twitter" className="btn-twitter">Seed Twitter</button>
          <button name="platform" value="facebook" className="btn-facebook">Seed Facebook</button>
          <button name="platform" value="instagram" className="btn-instagram">Seed Instagram</button>
          <button name="platform" value="all" className="btn-outline"><strong>Seed All</strong></button>
        </form>
      </div>
      <div className="card">
        <h3>Seed engagement</h3>
        <p>Adds fake likes to every persona post. Additive.</p>
        <form action={A.seedEngagement}>
          <ConfirmButton message="Add fake likes to every seed post?" className="btn-twitter">
            Seed engagement
          </ConfirmButton>
        </form>
      </div>
    </>
  );
}

type GroupRow = { id: number; name: string; creator: string; members: number };
export function GroupsTab({ groups, users }: { groups: GroupRow[]; users: Basic[] }) {
  return (
    <>
      <h2>Groups</h2>
      <div className="card">
        <h3>Create group (as user)</h3>
        <form action={A.createGroupAs}>
          <label>
            Name
            <input name="name" required />
          </label>
          <label>
            Description
            <textarea name="description" />
          </label>
          <label>
            Cover URL
            <input name="cover_url" />
          </label>
          <label>
            Creator
            <select name="created_by">
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.displayName}
                </option>
              ))}
            </select>
          </label>
          <button>Create</button>
        </form>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Creator</th>
            <th>Members</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>
                <Link href={`/facebook/group/${g.id}`}>{g.name}</Link>
              </td>
              <td>{g.creator}</td>
              <td>{g.members}</td>
              <td>
                <form action={A.deleteGroup} className="inline">
                  <input type="hidden" name="group_id" value={g.id} />
                  <ConfirmButton message="Delete group?" className="btn-danger">
                    Delete
                  </ConfirmButton>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

type StatRow = {
  userId: number;
  displayName: string;
  platform: string;
  statKey: string;
  statValue: number;
};
export function StatsTab({ rows }: { rows: StatRow[] }) {
  return (
    <>
      <h2>Stats override</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Platform</th>
            <th>Key</th>
            <th>Value</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.displayName}</td>
              <td>{r.platform}</td>
              <td>{r.statKey}</td>
              <td>{prettyNumber(r.statValue)}</td>
              <td>
                <form action={A.overrideStat} className="inline">
                  <input type="hidden" name="user_id" value={r.userId} />
                  <input type="hidden" name="platform" value={r.platform} />
                  <input type="hidden" name="stat_key" value={r.statKey} />
                  <input type="number" name="stat_value" defaultValue={r.statValue} />
                  <button>Set</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="muted">No manual stats set yet.</p> : null}
    </>
  );
}

type NoteRow = {
  id: number;
  status: string;
  noteText: string;
  author: string | null;
  postContent: string | null;
  poster: string | null;
};
export function NotesTab({ rows }: { rows: NoteRow[] }) {
  return (
    <>
      <h2>Community Notes</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Post (by)</th>
            <th>Note (by)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((n) => (
            <tr key={n.id}>
              <td>
                <div className="muted small">@{n.poster}</div>
                {trim(n.postContent, 140)}
              </td>
              <td>
                <div className="muted small">{n.author}</div>
                {trim(n.noteText, 140)}
              </td>
              <td>{n.status}</td>
              <td>
                {n.status === "visible" ? (
                  <form action={A.removeNote} className="inline">
                    <input type="hidden" name="note_id" value={n.id} />
                    <button className="btn-danger">Remove</button>
                  </form>
                ) : (
                  <form action={A.restoreNote} className="inline">
                    <input type="hidden" name="note_id" value={n.id} />
                    <button>Restore</button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="muted">No community notes yet.</p> : null}
    </>
  );
}

export function ResetTab() {
  return (
    <>
      <h2>Reset tools</h2>
      <div className="card">
        <h3>Likes</h3>
        <form action={A.resetLikes}>
          <ConfirmButton message="Delete ALL likes?" className="btn-danger">
            Reset all likes
          </ConfirmButton>
        </form>
      </div>
      <div className="card">
        <h3>All posts</h3>
        <form action={A.resetPosts}>
          <ConfirmButton
            message="Delete ALL posts (likes, comments, notes too)?"
            className="btn-danger"
          >
            Reset all posts
          </ConfirmButton>
        </form>
      </div>
      <div className="card">
        <h3>Reset a single platform</h3>
        <form action={A.resetPlatform}>
          <select name="platform">
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
          </select>{" "}
          <ConfirmButton message="Delete all posts on that platform?" className="btn-danger">
            Reset platform
          </ConfirmButton>
        </form>
      </div>
      <div className="card">
        <h3>Delete all non-admin users</h3>
        <p className="muted small">
          Removes every non-admin user account and all their content. Admin accounts
          and persona seed accounts are not touched.
        </p>
        <form action={A.deleteNonAdminUsers}>
          <ConfirmButton
            message="Permanently delete EVERY non-admin user and all their content. Continue?"
            className="btn-danger"
          >
            Delete all non-admin users
          </ConfirmButton>
        </form>
      </div>
    </>
  );
}

type SessionRow = {
  id: number;
  username: string;
  displayName: string;
  lastActive: Date | null;
};
export function SessionsTab({ rows }: { rows: SessionRow[] }) {
  return (
    <>
      <h2>Session overview</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Last active</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                {r.displayName} (@{r.username})
              </td>
              <td>
                {r.lastActive
                  ? `${fmtDate(r.lastActive)} (${relativeTime(r.lastActive)} ago)`
                  : "never"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

type ScenarioResponseRow = {
  userId: number;
  displayName: string;
  username: string;
  scenarioId: string;
  taskId: string;
  selectedIndex: number | null;
  isCorrect: boolean | null;
  responseText: string | null;
  teacherFeedback: string | null;
  submittedAt: Date;
};

type ScenarioSubmissionRow = {
  userId: number;
  displayName: string;
  username: string;
  scenarioId: string;
  answers: number;
  mcqCorrect: number;
  mcqTotal: number;
  unreadFeedback: number;
  lastSubmitted: Date;
};

const submissionHref = (userId: number, scenarioId: string) =>
  `/admin?tab=scenario&user=${userId}&scenario=${encodeURIComponent(scenarioId)}`;

/** List view: one row per submission (student × scenario). Click through to the
 *  answers + feedback. Keeps the tab from being a wall of text. Also hosts the
 *  class-demo picker. */
export function ScenarioResponsesList({
  rows,
  demoId,
}: {
  rows: ScenarioSubmissionRow[];
  demoId: string | null;
}) {
  const scenarios = listScenarios();
  return (
    <>
      <h2>Scenario Q&amp;A</h2>

      <div className="card">
        <h3>Class demo scenario</h3>
        <p className="muted small">
          The scenario featured at the top of everyone&apos;s Scenarios page —
          the one you present to the class.
        </p>
        <form action={A.setClassDemo} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <select name="scenario_id" defaultValue={demoId ?? ""}>
            <option value="">— None —</option>
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          <button className="btn-twitter">Set class demo</button>
        </form>
      </div>

      <h3>Submissions</h3>
      <p className="muted small">
        One row per submission — click a row to view the answers and leave
        feedback.
      </p>
      {rows.length === 0 ? (
        <p className="muted">No responses submitted yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Scenario</th>
              <th>MCQ</th>
              <th>Submitted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const href = submissionHref(r.userId, r.scenarioId);
              const title = getScenario(r.scenarioId)?.title ?? r.scenarioId;
              return (
                <tr key={`${r.userId}:${r.scenarioId}`}>
                  <td>
                    <Link href={href}>{r.displayName}</Link>{" "}
                    <span className="muted small">@{r.username}</span>
                  </td>
                  <td>
                    <Link href={href}>{title}</Link>
                  </td>
                  <td>
                    {r.mcqCorrect}/{r.mcqTotal}
                  </td>
                  <td className="small">
                    {fmtDate(new Date(r.lastSubmitted))}
                  </td>
                  <td className="small">
                    {r.unreadFeedback > 0 ? (
                      <span className="muted" style={{ marginRight: 8 }}>
                        {r.unreadFeedback} unseen
                      </span>
                    ) : null}
                    <Link href={href}>View answers →</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

/** Detail view: the full answers for one submission, with per-written-answer
 *  feedback boxes. Authored prompts/options resolved from the registry. */
export function ScenarioResponseDetail({ rows }: { rows: ScenarioResponseRow[] }) {
  const back = (
    <Link href="/admin?tab=scenario">← All submissions</Link>
  );
  const first = rows[0];
  if (!first) {
    return (
      <>
        <p style={{ marginBottom: 10 }}>{back}</p>
        <p className="muted">This submission no longer exists.</p>
      </>
    );
  }

  const { displayName, username, scenarioId } = first;
  const scenario = getScenario(scenarioId);
  const mcqRows = rows.filter((r) => r.selectedIndex !== null);
  const correct = mcqRows.filter((r) => r.isCorrect).length;
  const ordered = scenario?.tasks
    ? (scenario.tasks
        .map((t) => rows.find((r) => r.taskId === t.id))
        .filter(Boolean) as ScenarioResponseRow[])
    : rows;
  const latest = rows.reduce((a, b) =>
    a.submittedAt > b.submittedAt ? a : b,
  ).submittedAt;

  return (
    <>
      <p style={{ marginBottom: 10 }}>{back}</p>
      <h2>
        {displayName} <span className="muted small">@{username}</span>
      </h2>
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <strong>{scenario?.title ?? scenarioId}</strong>
          <span className="muted small">
            MCQ {correct}/{mcqRows.length} · last submitted {fmtDate(latest)}
          </span>
        </div>

        <ol
          style={{
            margin: "10px 0 0",
            paddingLeft: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {ordered.map((r) => {
            const task = getTask(scenarioId, r.taskId);
            if (task?.type === "mcq") {
              const chosen =
                r.selectedIndex != null ? task.options[r.selectedIndex] : "—";
              return (
                <li key={r.taskId}>
                  <div style={{ fontWeight: 600 }}>{task.prompt}</div>
                  <div
                    style={{ color: r.isCorrect ? "#1c7a3e" : "var(--danger)" }}
                  >
                    {r.isCorrect ? "✓" : "✗"} {chosen}
                  </div>
                  {!r.isCorrect ? (
                    <div className="muted small">
                      Correct: {task.options[task.correctIndex]}
                    </div>
                  ) : null}
                </li>
              );
            }
            return (
              <li key={r.taskId}>
                <div style={{ fontWeight: 600 }}>
                  {task?.prompt ?? r.taskId}
                </div>
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {r.responseText || <span className="muted">(blank)</span>}
                </div>
                <form action={A.saveScenarioFeedback} style={{ marginTop: 6 }}>
                  <input type="hidden" name="user_id" value={r.userId} />
                  <input type="hidden" name="scenario_id" value={r.scenarioId} />
                  <input type="hidden" name="task_id" value={r.taskId} />
                  <label className="muted small">
                    Feedback to student
                    <textarea
                      name="feedback"
                      rows={2}
                      defaultValue={r.teacherFeedback ?? ""}
                      placeholder="Advice to send back to the student…"
                    />
                  </label>
                  <div className="popover-actions">
                    <button>
                      {r.teacherFeedback ? "Update feedback" : "Save feedback"}
                    </button>
                  </div>
                </form>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export function LogsTab({
  lines,
  size,
  limit,
  filter,
}: {
  lines: LogLine[];
  size: number;
  limit: number;
  filter: string;
}) {
  return (
    <>
      <h2>Activity log</h2>
      <p className="muted small">
        size: {size.toLocaleString()} bytes · showing newest {lines.length} of last {limit}
        {filter ? (
          <>
            {" "}
            · filter: <code>{filter}</code>
          </>
        ) : null}
      </p>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <form method="get" style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 300 }}>
          <input type="hidden" name="tab" value="logs" />
          <input
            name="filter"
            defaultValue={filter}
            placeholder="filter (e.g. login_failed, admin., student ID)"
            style={{ flex: 1 }}
          />
          <select name="limit" defaultValue={String(limit)}>
            {[100, 500, 1000, 2000, 5000].map((n) => (
              <option key={n} value={n}>
                {n} lines
              </option>
            ))}
          </select>
          <button>Refresh</button>
        </form>
        <a className="btn-outline" href="/admin/logs/download">
          Download .log
        </a>
        <form action={A.clearLogAction} style={{ display: "inline" }}>
          <ConfirmButton message="Clear the log file? This deletes all entries." className="btn-danger">
            Clear log
          </ConfirmButton>
        </form>
      </div>
      {lines.length === 0 ? (
        <p className="muted">No log entries yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Level</th>
              <th>IP</th>
              <th>User</th>
              <th>Action</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={i}>
                <td className="small">{l.ts}</td>
                <td className="small">{l.level}</td>
                <td className="small">{l.ip}</td>
                <td className="small">{l.user}</td>
                <td className="small">
                  <strong>{l.action}</strong>
                </td>
                <td className="small">{l.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

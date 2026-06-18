import { requireAdmin } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { AdminNav } from "@/components/admin/admin-nav";
import {
  UsersTab,
  SeedTab,
  GroupsTab,
  StatsTab,
  NotesTab,
  ScenarioResponsesList,
  ScenarioResponseDetail,
  ResetTab,
  SessionsTab,
  LogsTab,
} from "@/components/admin/tabs";
import {
  listUsers,
  listUsersBasic,
  listGroups,
  listManualStats,
  listNotes,
  listScenarioSubmissions,
  getScenarioSubmission,
  listSessions,
} from "@/lib/admin/queries";
import { readLog } from "@/lib/log";

// Faithful port of PHP handle_admin() — tabbed admin panel (admin-only).
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    filter?: string;
    limit?: string;
    user?: string;
    scenario?: string;
  }>;
}) {
  const me = await requireAdmin();
  const sp = await searchParams;
  const tab = sp.tab ?? "users";

  let body: React.ReactNode = null;
  switch (tab) {
    case "seed":
      body = <SeedTab users={await listUsersBasic()} />;
      break;
    case "groups":
      body = <GroupsTab groups={await listGroups()} users={await listUsersBasic()} />;
      break;
    case "stats":
      body = <StatsTab rows={await listManualStats()} />;
      break;
    case "notes":
      body = <NotesTab rows={await listNotes()} />;
      break;
    case "scenario": {
      const uid = Number(sp.user);
      const scn = sp.scenario;
      if (uid && scn) {
        body = (
          <ScenarioResponseDetail rows={await getScenarioSubmission(uid, scn)} />
        );
      } else {
        body = <ScenarioResponsesList rows={await listScenarioSubmissions()} />;
      }
      break;
    }
    case "reset":
      body = <ResetTab />;
      break;
    case "sessions":
      body = <SessionsTab rows={await listSessions()} />;
      break;
    case "logs": {
      const limit = Math.max(50, Math.min(5000, Number(sp.limit) || 500));
      const filter = (sp.filter ?? "").trim();
      const { lines, size } = await readLog(limit, filter);
      body = <LogsTab lines={lines} size={size} limit={limit} filter={filter} />;
      break;
    }
    case "users":
    default:
      body = <UsersTab users={await listUsers()} meId={me.id} />;
      break;
  }

  return (
    <>
      <AppChrome user={me} />
      <main className="content">
        <AdminNav active={tab} />
        {body}
      </main>
    </>
  );
}

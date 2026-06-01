import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { organisations, personas } from "@/db/schema";
import { getCurrentAccount } from "@/lib/auth/session";
import { getOrCreateWorkspace } from "@/lib/auth/provision";
import { logout } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  if (account.role !== "student") redirect("/admin");

  const workspace = await getOrCreateWorkspace(account.id);
  const [org] = await db
    .select()
    .from(organisations)
    .where(eq(organisations.id, workspace.organisationId))
    .limit(1);
  const community = await db
    .select()
    .from(personas)
    .where(eq(personas.workspaceId, workspace.id));

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Signed in as {account.displayName}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">
            {org?.name ?? "Workspace"}
          </h1>
          {org?.handle ? (
            <p className="text-sm text-muted-foreground">@{org.handle}</p>
          ) : null}
        </div>
        <form action={logout}>
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </header>

      <section className="rounded-lg border p-5">
        <h2 className="font-semibold">Your Workspace</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Private and isolated — only you can see this data. Mission:{" "}
          {org?.mission ?? "—"}
        </p>
        <p className="mt-3 text-sm">
          Seeded community: {community.length} personas
        </p>
      </section>

      <p className="text-xs text-muted-foreground">
        Slice 1 (auth + provisioning) complete. Campaign setup is next.
      </p>
    </main>
  );
}

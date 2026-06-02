import Link from "next/link";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { organisations } from "@/db/schema";
import { requireStudentWorkspace } from "@/lib/auth/guards";
import { logout } from "@/lib/auth/actions";
import { listCampaigns } from "@/lib/campaign/queries";
import { createCampaign } from "@/lib/campaign/actions";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const { account, workspace } = await requireStudentWorkspace();
  const [org] = await db
    .select()
    .from(organisations)
    .where(eq(organisations.id, workspace.organisationId))
    .limit(1);
  const campaigns = await listCampaigns(workspace.id);

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
        <div className="flex items-center gap-3">
          <Link
            href="/analytics"
            className="text-sm text-platform underline-offset-4 hover:underline"
          >
            Analysis →
          </Link>
          <form action={logout}>
            <Button variant="outline" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold">Campaigns</h2>
        {campaigns.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No campaigns yet. Create one to start planning.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {campaigns.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/campaign/${c.id}`}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
                >
                  <span>
                    <span className="font-medium">{c.name}</span>
                    {c.goal ? (
                      <span className="ml-2 text-sm text-muted-foreground">
                        {c.goal}
                      </span>
                    ) : null}
                  </span>
                  {c.isActive ? (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      Active
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Inactive
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border p-5">
        <h2 className="font-semibold">New campaign</h2>
        <form action={createCampaign} className="mt-3 flex flex-col gap-3">
          <input
            name="name"
            required
            placeholder="Campaign name (e.g. Autumn Recruitment Drive)"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          />
          <input
            name="goal"
            placeholder="Goal (optional)"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          />
          <Button type="submit" className="self-start">
            Create campaign
          </Button>
        </form>
      </section>
    </main>
  );
}

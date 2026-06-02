import Link from "next/link";

import { requireTeacher } from "@/lib/auth/guards";
import { logout } from "@/lib/auth/actions";
import { listStudentsForAdmin } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const teacher = await requireTeacher();
  const students = await listStudentsForAdmin();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Teacher · {teacher.displayName}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        </div>
        <form action={logout}>
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold">Students</h2>
        {students.length === 0 ? (
          <p className="text-sm text-muted-foreground">No students yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {students.map((s) => (
              <li key={s.accountId} className="rounded-lg border p-4">
                <p className="font-medium">
                  {s.displayName}{" "}
                  <span className="text-sm text-muted-foreground">
                    @{s.username}
                  </span>
                </p>
                {s.campaigns.length === 0 ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    No campaigns yet.
                  </p>
                ) : (
                  <ul className="mt-2 flex flex-col gap-1">
                    {s.campaigns.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/admin/campaign/${c.id}`}
                          className="text-sm text-platform underline-offset-4 hover:underline"
                        >
                          {c.name}
                        </Link>
                        {c.isActive ? (
                          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            Active
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-xs text-muted-foreground">
        Open a campaign to reveal the per-post factor breakdown (hidden from
        students) and reset a run for demonstration.
      </p>
    </main>
  );
}

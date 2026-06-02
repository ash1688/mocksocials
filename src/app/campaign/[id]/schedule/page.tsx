import Link from "next/link";
import { notFound } from "next/navigation";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaignSetup } from "@/lib/campaign/queries";
import { listScheduleEntries } from "@/lib/schedule/queries";
import { addScheduleEntry, removeScheduleEntry } from "@/lib/schedule/actions";
import { PLATFORM_LABELS } from "@/lib/campaign/constants";
import { DAY_LABELS, formatMinute } from "@/lib/posts/constants";
import type { Platform } from "@/lib/simulation/types";
import { Button } from "@/components/ui/button";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspace } = await requireStudentWorkspace();
  const setup = await getCampaignSetup(id, workspace.id);
  if (!setup) notFound();

  const { campaign, platforms } = setup;
  const entries = await listScheduleEntries(id);

  const when = (day: number | null, minute: number | null) => {
    if (day === null && minute === null) return "—";
    const d = day !== null ? DAY_LABELS[day] : "";
    const t = minute !== null ? formatMinute(minute) : "";
    return `${d} ${t}`.trim();
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-10">
      <header>
        <Link href={`/campaign/${id}`} className="text-sm text-muted-foreground hover:underline">
          ← {campaign.name}
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Content schedule</h1>
        <p className="text-sm text-muted-foreground">
          Your plan for what the Organisation intends to post — by platform, how
          often, and when. This is a planning artifact (Aim B); you enact it by
          publishing posts on each platform.
        </p>
      </header>

      {/* The schedule itself — clean for screenshot/print evidence */}
      <section>
        {entries.length === 0 ? (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            No schedule entries yet.
          </p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Platform</th>
                <th className="px-2 py-2 font-medium">Frequency</th>
                <th className="px-2 py-2 font-medium">Day / time</th>
                <th className="px-2 py-2 font-medium">Content theme</th>
                <th className="py-2 pl-2" />
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b align-top">
                  <td className="py-2 pr-3 font-medium">
                    {PLATFORM_LABELS[e.platform as Platform]}
                  </td>
                  <td className="px-2 py-2">{e.frequency}</td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    {when(e.postingDay, e.postingMinute)}
                  </td>
                  <td className="px-2 py-2">{e.theme}</td>
                  <td className="py-2 pl-2 text-right">
                    <form action={removeScheduleEntry}>
                      <input type="hidden" name="campaignId" value={id} />
                      <input type="hidden" name="entryId" value={e.id} />
                      <button
                        type="submit"
                        className="text-muted-foreground hover:text-destructive"
                        title="Remove"
                      >
                        ×
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Add an entry */}
      <section className="rounded-lg border p-5">
        <h2 className="font-semibold">Add a planned slot</h2>
        {platforms.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Enable an Active platform on the campaign first.
          </p>
        ) : (
          <form action={addScheduleEntry} className="mt-3 flex flex-col gap-3">
            <input type="hidden" name="campaignId" value={id} />
            <div className="flex flex-wrap gap-2">
              <select
                name="platform"
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                aria-label="Platform"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {PLATFORM_LABELS[p]}
                  </option>
                ))}
              </select>
              <input
                name="frequency"
                required
                placeholder="how often (e.g. Twice a week)"
                className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                name="postingDay"
                defaultValue=""
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                aria-label="Day"
              >
                <option value="">Any day</option>
                {DAY_LABELS.map((d, i) => (
                  <option key={d} value={i}>
                    {d}
                  </option>
                ))}
              </select>
              <input
                type="time"
                name="time"
                aria-label="Time"
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              />
              <input
                name="theme"
                required
                placeholder="content theme (e.g. Volunteer spotlight)"
                className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
            <Button type="submit" className="self-start">
              Add to schedule
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}

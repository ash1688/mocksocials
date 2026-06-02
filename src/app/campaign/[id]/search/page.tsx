import Link from "next/link";
import { notFound } from "next/navigation";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import { getOrganisationForWorkspace } from "@/lib/render/queries";
import { getKeywordRankings } from "@/lib/analytics/queries";
import { buildSerp } from "@/lib/search/serp";

export default async function MockSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { id } = await params;
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(id, workspace.id);
  if (!campaign) notFound();

  const [org, ranks] = await Promise.all([
    getOrganisationForWorkspace(workspace.id),
    getKeywordRankings(id),
  ]);

  const matched = ranks.find((r) => r.term.toLowerCase() === query.toLowerCase());
  const orgRank = matched?.current ?? null;
  const results = org
    ? buildSerp(
        query,
        { name: org.name, handle: org.handle, tagline: org.tagline, mission: org.mission },
        orgRank,
      )
    : [];

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <span className="text-lg font-extrabold tracking-tight">
            Mock<span className="text-platform">Search</span>
          </span>
          <Link
            href={`/campaign/${id}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Campaign
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <form method="GET" className="flex gap-2">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search the mock web…"
            className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm"
          />
          <button
            type="submit"
            className="h-10 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Search
          </button>
        </form>

        {/* Quick searches from the tracked keyword strategy */}
        {ranks.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="text-muted-foreground">Your keywords:</span>
            {ranks.map((r) => (
              <Link
                key={r.term}
                href={`/campaign/${id}/search?q=${encodeURIComponent(r.term)}`}
                className="rounded-full border px-3 py-0.5 hover:bg-accent"
              >
                {r.term}
              </Link>
            ))}
          </div>
        ) : null}

        {query ? (
          <div className="mt-6">
            <p className="mb-3 text-xs text-muted-foreground">
              About {results.length} results for “{query}”
              {orgRank
                ? ` · your site ranks #${orgRank}`
                : matched
                  ? ""
                  : " · your site is not ranking for this term"}
            </p>
            <ol className="flex flex-col gap-5">
              {results.map((r) => (
                <li
                  key={r.rank}
                  className={
                    r.isOrg ? "rounded-md border border-platform/40 bg-platform/5 p-3" : ""
                  }
                >
                  <p className="text-xs text-muted-foreground">{r.url}</p>
                  <p className="text-lg text-[hsl(var(--platform))] underline-offset-2 hover:underline">
                    {r.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{r.snippet}</p>
                  {r.isOrg ? (
                    <p className="mt-1 text-xs font-medium text-platform">
                      ★ This is your Organisation
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Search a keyword to see where the Organisation ranks.
          </p>
        )}
      </main>
    </div>
  );
}

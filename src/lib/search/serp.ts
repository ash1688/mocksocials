/**
 * Mock SERP builder (CONTEXT.md: Search ranking). Produces a fake
 * search-results page the Student can screenshot. The Organisation's result is
 * placed at its simulated rank among deterministic filler results, seeded by the
 * query so the page is stable/reproducible (ADR-0001). No real search, no
 * network — purely generated.
 */
import { hashSeed } from "@/lib/simulation/rng";

export const PAGE_SIZE = 10;

export interface SerpResult {
  title: string;
  url: string;
  snippet: string;
  isOrg: boolean;
  rank: number;
}

const FILLER = [
  { t: "{Q} courses near you", d: "localcollege.example", s: "Find {q} courses and evening classes in your area. Enrol today." },
  { t: "Learn {Q} — beginner to advanced", d: "skillshub.example", s: "Step-by-step {q} tutorials and qualifications for all levels." },
  { t: "Best {Q} training providers", d: "trainfinder.example", s: "Compare accredited {q} training providers and reviews." },
  { t: "{Q} apprenticeships and jobs", d: "careers.example", s: "Browse {q} apprenticeship vacancies and entry-level roles." },
  { t: "How to get into {Q}", d: "guides.example", s: "A practical guide to starting a career in {q}." },
  { t: "{Q} — encyclopaedia", d: "mockpedia.example", s: "Overview, history and methods relating to {q}." },
  { t: "Local {Q} workshops", d: "communityhub.example", s: "Hands-on {q} workshops run by local volunteers." },
  { t: "{Q} careers advice", d: "nextstep.example", s: "Free advice on {q} pathways, funding and support." },
];

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export interface OrgResultInput {
  name: string;
  handle: string;
  tagline: string | null;
  mission: string | null;
}

/** Build a page of results for `query`, with the Organisation at `orgRank`
 *  (1-based) if it ranks on this page; otherwise filler only. */
export function buildSerp(
  query: string,
  org: OrgResultInput,
  orgRank: number | null,
): SerpResult[] {
  const q = query.trim();
  if (!q) return [];
  const base = hashSeed(q) % FILLER.length;
  const orgSlot = orgRank && orgRank >= 1 && orgRank <= PAGE_SIZE ? orgRank - 1 : -1;

  const results: SerpResult[] = [];
  let f = 0;
  for (let slot = 0; slot < PAGE_SIZE; slot++) {
    if (slot === orgSlot) {
      results.push({
        title: `${org.name} — ${org.tagline ?? "Official page"}`,
        url: `${slug(org.handle)}.example`,
        snippet: org.mission ?? `The official home of ${org.name}.`,
        isOrg: true,
        rank: slot + 1,
      });
    } else {
      const item = FILLER[(base + f) % FILLER.length]!;
      results.push({
        title: item.t.replaceAll("{Q}", cap(q)).replaceAll("{q}", q),
        url: `${item.d}/${slug(q)}`,
        snippet: item.s.replaceAll("{q}", q),
        isOrg: false,
        rank: slot + 1,
      });
      f++;
    }
  }
  return results;
}

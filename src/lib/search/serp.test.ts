import { describe, it, expect } from "vitest";

import { buildSerp, PAGE_SIZE } from "./serp";

const org = {
  name: "Technicians Initiative",
  handle: "technicians-initiative",
  tagline: "Hands-on skills",
  mission: "Getting young people into trades.",
};

describe("buildSerp (deterministic mock SERP)", () => {
  it("returns nothing for an empty query", () => {
    expect(buildSerp("", org, 3)).toEqual([]);
  });

  it("is deterministic for the same query", () => {
    expect(buildSerp("welding", org, null)).toEqual(buildSerp("welding", org, null));
  });

  it("returns a full page of results", () => {
    expect(buildSerp("welding", org, null)).toHaveLength(PAGE_SIZE);
  });

  it("places the Organisation at its rank when it is on the page", () => {
    const results = buildSerp("welding", org, 3);
    expect(results[2]!.isOrg).toBe(true);
    expect(results[2]!.rank).toBe(3);
    expect(results.filter((r) => r.isOrg)).toHaveLength(1);
  });

  it("shows only filler when the Organisation ranks off the page", () => {
    expect(buildSerp("welding", org, 24).some((r) => r.isOrg)).toBe(false);
    expect(buildSerp("welding", org, null).some((r) => r.isOrg)).toBe(false);
  });

  it("interpolates the query into result titles", () => {
    const results = buildSerp("plumbing", org, null);
    expect(results.some((r) => r.title.toLowerCase().includes("plumbing"))).toBe(true);
  });
});

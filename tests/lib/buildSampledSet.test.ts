import { describe, it, expect } from "vitest";
import { buildSampledSet } from "@/lib/buildSampledSet";
import { inclusiveRange } from "@/lib/inclusiveRange";
import type { QuizCard } from "@/types";

const card = (id: string): QuizCard => ({ id, topic: "t", type: "word", english: id, german: id, explanation: "" });

describe("inclusiveRange", () => {
  it("includes both ends", () => {
    expect(inclusiveRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("buildSampledSet", () => {
  const core = inclusiveRange(1, 3).map((n) => card(`c${n}`));
  const pool = inclusiveRange(1, 10).map((n) => card(`p${n}`));

  it("returns core plus drawCount cards", () => {
    expect(buildSampledSet(core, pool, 4)).toHaveLength(7);
  });
  it("always contains every core card", () => {
    const ids = buildSampledSet(core, pool, 4).map((c) => c.id);
    core.forEach((c) => expect(ids).toContain(c.id));
  });
  it("has no duplicate ids", () => {
    const ids = buildSampledSet(core, pool, 4).map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("draws only from the pool", () => {
    const poolIds = new Set(pool.map((c) => c.id));
    const coreIds = new Set(core.map((c) => c.id));
    buildSampledSet(core, pool, 4)
      .filter((c) => !coreIds.has(c.id))
      .forEach((c) => expect(poolIds.has(c.id)).toBe(true));
  });
  it("caps the draw at the pool size", () => {
    expect(buildSampledSet(core, pool, 999)).toHaveLength(core.length + pool.length);
  });
});

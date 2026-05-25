import { describe, it, expect } from "vitest";
import { shuffleArray } from "@/lib/shuffleArray";

describe("shuffleArray", () => {
  it("returns an array of the same length", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
  });

  it("contains the same elements as the input", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual([...input].sort());
  });

  it("does not mutate the input array", () => {
    const input = [1, 2, 3];
    const snapshot = [...input];
    shuffleArray(input);
    expect(input).toEqual(snapshot);
  });
});

import { describe, it, expect } from "vitest";
import {
  germanCardinal,
  englishCardinal,
  germanOrdinal,
  englishOrdinal,
} from "@/lib/numberWords";

describe("germanCardinal", () => {
  const cases: [number, string][] = [
    [0, "null"], [1, "eins"], [7, "sieben"], [10, "zehn"], [11, "elf"],
    [12, "zwoelf"], [16, "sechzehn"], [17, "siebzehn"], [20, "zwanzig"],
    [21, "einundzwanzig"], [30, "dreissig"], [47, "siebenundvierzig"],
    [60, "sechzig"], [70, "siebzig"], [99, "neunundneunzig"], [100, "hundert"],
  ];
  it.each(cases)("germanCardinal(%i) = %s", (n, word) => {
    expect(germanCardinal(n)).toBe(word);
  });
  it("never returns empty for 0..100", () => {
    for (let n = 0; n <= 100; n++) expect(germanCardinal(n)).not.toBe("");
  });
});

describe("englishCardinal", () => {
  const cases: [number, string][] = [
    [0, "zero"], [7, "seven"], [10, "ten"], [13, "thirteen"], [20, "twenty"],
    [21, "twenty-one"], [47, "forty-seven"], [100, "one hundred"],
  ];
  it.each(cases)("englishCardinal(%i) = %s", (n, word) => {
    expect(englishCardinal(n)).toBe(word);
  });
});

describe("germanOrdinal", () => {
  const cases: [number, string][] = [
    [1, "erste"], [2, "zweite"], [3, "dritte"], [4, "vierte"], [7, "siebte"],
    [8, "achte"], [11, "elfte"], [16, "sechzehnte"], [20, "zwanzigste"],
    [21, "einundzwanzigste"], [100, "hundertste"],
  ];
  it.each(cases)("germanOrdinal(%i) = %s", (n, word) => {
    expect(germanOrdinal(n)).toBe(word);
  });
  it("never returns empty for 1..100", () => {
    for (let n = 1; n <= 100; n++) expect(germanOrdinal(n)).not.toBe("");
  });
});

describe("englishOrdinal", () => {
  const cases: [number, string][] = [
    [1, "first"], [2, "second"], [3, "third"], [4, "fourth"], [5, "fifth"],
    [8, "eighth"], [9, "ninth"], [11, "eleventh"], [12, "twelfth"],
    [20, "twentieth"], [21, "twenty-first"], [100, "one hundredth"],
  ];
  it.each(cases)("englishOrdinal(%i) = %s", (n, word) => {
    expect(englishOrdinal(n)).toBe(word);
  });
});

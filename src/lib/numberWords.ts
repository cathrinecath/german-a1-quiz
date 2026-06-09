const germanOnes = ["null", "eins", "zwei", "drei", "vier", "fuenf", "sechs", "sieben", "acht", "neun"];
const germanTeens = ["zehn", "elf", "zwoelf", "dreizehn", "vierzehn", "fuenfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
const germanTens = ["", "", "zwanzig", "dreissig", "vierzig", "fuenfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

export function germanCardinal(n: number): string {
  if (n === 100) return "hundert";
  if (n < 10) return germanOnes[n];
  if (n < 20) return germanTeens[n - 10];
  const tens = germanTens[Math.floor(n / 10)];
  const unit = n % 10;
  if (unit === 0) return tens;
  const unitWord = unit === 1 ? "ein" : germanOnes[unit];
  return `${unitWord}und${tens}`;
}

const englishOnes = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const englishTeens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const englishTens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

export function englishCardinal(n: number): string {
  if (n === 100) return "one hundred";
  if (n < 10) return englishOnes[n];
  if (n < 20) return englishTeens[n - 10];
  const tens = englishTens[Math.floor(n / 10)];
  const unit = n % 10;
  return unit === 0 ? tens : `${tens}-${englishOnes[unit]}`;
}

const germanOrdinalIrregulars: Record<number, string> = { 1: "erste", 3: "dritte", 7: "siebte", 8: "achte" };

export function germanOrdinal(n: number): string {
  if (germanOrdinalIrregulars[n]) return germanOrdinalIrregulars[n];
  return germanCardinal(n) + (n < 20 ? "te" : "ste");
}

const englishOrdinalIrregulars: Record<string, string> = {
  one: "first", two: "second", three: "third", five: "fifth",
  eight: "eighth", nine: "ninth", twelve: "twelfth",
};

export function englishOrdinal(n: number): string {
  const parts = englishCardinal(n).split("-");
  const lastIndex = parts.length - 1;
  const last = parts[lastIndex];
  if (englishOrdinalIrregulars[last]) parts[lastIndex] = englishOrdinalIrregulars[last];
  else if (last.endsWith("y")) parts[lastIndex] = `${last.slice(0, -1)}ieth`;
  else parts[lastIndex] = `${last}th`;
  return parts.join("-");
}

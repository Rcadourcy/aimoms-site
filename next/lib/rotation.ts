/**
 * Weekly content rotation — the "auto-update on a cadence" engine for The Edit.
 *
 * The whole point: the editorial page should feel like a living publication that
 * refreshes every week, WITHOUT anyone editing code, running a cron job, or calling
 * an API. We do that deterministically from the calendar:
 *
 *   - `currentWeekIndex()` gives an integer that ticks up by 1 every week (UTC).
 *   - That integer seeds a stable shuffle, so within a given week the order never
 *     changes (no layout flicker, identical on server and client — no hydration
 *     mismatch), but the moment the week rolls over, everything rearranges.
 *
 * Because the seed is passed from the server component into the client component as
 * a plain number, both renders agree exactly. No randomness, no Date on the client.
 */

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Weeks since the Unix epoch (a Thursday), anchored so the boundary lands on
 * Monday 00:00 UTC. Increments by exactly 1 each week. Pass a date for testing.
 */
export function currentWeekIndex(date: Date = new Date()): number {
  // Shift by 4 days so week boundaries fall on Monday rather than Thursday.
  const shifted = date.getTime() + 4 * 24 * 60 * 60 * 1000;
  return Math.floor(shifted / MS_PER_WEEK);
}

/** Small, fast, deterministic PRNG (mulberry32). Same seed → same sequence. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic Fisher–Yates shuffle. Never mutates the input. The same
 * (array, seed) pair always returns the same order.
 */
export function seededShuffle<T>(input: readonly T[], seed: number): T[] {
  const arr = input.slice();
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * A sliding window of `count` items that advances by one each week and wraps
 * around the end — so featured slots cycle through the ENTIRE list over time
 * instead of always showing the same few. Order within the window is stable.
 */
export function rotateWindow<T>(input: readonly T[], count: number, seed: number): T[] {
  const len = input.length;
  if (len === 0) return [];
  const n = Math.min(count, len);
  const start = ((seed % len) + len) % len;
  const out: T[] = [];
  for (let k = 0; k < n; k++) out.push(input[(start + k) % len]);
  return out;
}

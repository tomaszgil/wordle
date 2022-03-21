import { checkGuess, isWin, isEnd } from "./game";
import { ResolvedWordGuess } from "./types";

describe("checkGuess", () => {
  it.each([
    [
      "proxy",
      "proxy",
      [
        { letter: "p", status: "match" },
        { letter: "r", status: "match" },
        { letter: "o", status: "match" },
        { letter: "x", status: "match" },
        { letter: "y", status: "match" },
      ],
    ],
    [
      "proxy",
      "tests",
      [
        { letter: "p", status: "miss" },
        { letter: "r", status: "miss" },
        { letter: "o", status: "miss" },
        { letter: "x", status: "miss" },
        { letter: "y", status: "miss" },
      ],
    ],
    [
      "proxy",
      "xeros",
      [
        { letter: "p", status: "miss" },
        { letter: "r", status: "include" },
        { letter: "o", status: "include" },
        { letter: "x", status: "include" },
        { letter: "y", status: "miss" },
      ],
    ],
    [
      "steps",
      "steer",
      [
        { letter: "s", status: "match" },
        { letter: "t", status: "match" },
        { letter: "e", status: "match" },
        { letter: "p", status: "miss" },
        { letter: "s", status: "miss" },
      ],
    ],
  ])("for %s and reference %s", (guess, reference, expected) => {
    expect(checkGuess(guess, reference)).toEqual(expected);
  });
});

describe("isWin", () => {
  it.each([
    [
      "for all misses",
      false,
      [
        { letter: "a", status: "miss" },
        { letter: "a", status: "miss" },
        { letter: "a", status: "miss" },
        { letter: "a", status: "miss" },
        { letter: "a", status: "miss" },
      ],
    ],
    [
      "for some misses, matches and includes",
      false,
      [
        { letter: "a", status: "miss" },
        { letter: "a", status: "match" },
        { letter: "a", status: "include" },
        { letter: "a", status: "miss" },
        { letter: "a", status: "miss" },
      ],
    ],
    [
      "for all matches",
      true,
      [
        { letter: "a", status: "match" },
        { letter: "a", status: "match" },
        { letter: "a", status: "match" },
        { letter: "a", status: "match" },
        { letter: "a", status: "match" },
      ],
    ],
  ])("%s returns %s", (_, expected, guesses) => {
    expect(isWin(guesses as ResolvedWordGuess)).toBe(expected);
  });
});

describe("isEnd", () => {
  const guess: ResolvedWordGuess = [
    { letter: "a", status: "miss" },
    { letter: "a", status: "miss" },
    { letter: "a", status: "miss" },
    { letter: "a", status: "miss" },
    { letter: "a", status: "miss" },
  ];

  it.each([
    ["for no previous guesses", false, []],
    ["for 1 previous guess", false, [guess]],
    ["for 2 previous guesses", false, [guess, guess]],
    ["for 3 previous guesses", false, [guess, guess, guess]],
    ["for 4 previous guesses", false, [guess, guess, guess, guess]],
    ["for 5 previous guesses", true, [guess, guess, guess, guess, guess]],
  ])("%s returns %s", (_, expected, guesses) => {
    expect(isEnd(guesses)).toBe(expected);
  });
});

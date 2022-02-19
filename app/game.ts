import { ResolvedWordGuess } from "./types";

export function checkGuess(guess: string, reference: string) {
  const word = reference.split("");
  const result: ResolvedWordGuess = guess.split("").map((letter: string) => ({
    letter,
    status: "miss",
  }));

  // Check for matches
  guess.split("").forEach((letter, i) => {
    if (word[i] === letter) {
      result[i].status = "match";
      word[i] = "";
    }
  });

  // Check for includes
  guess.split("").forEach((letter, i) => {
    if (result[i].status === "miss" && word.includes(letter)) {
      result[i].status = "include";
      const index = word.findIndex((l: string) => l === letter);
      word[index] = "";
    }
  });

  return result;
}

export function isWin(result: ResolvedWordGuess) {
  return result.every(({ status }) => status === "match");
}

export function isLoss(previousGuesses: ResolvedWordGuess[]) {
  return previousGuesses.length === 5;
}

import { ResolvedWordGuess } from "./types";

export function checkGuess(guess: string, reference: string) {
  const word = reference.split("");
  const result: ResolvedWordGuess = guess.split("").map((letter: string) => ({
    letter,
    status: "miss",
  }));

  // Check for matches
  for (let i = 0; i < guess.length; i++) {
    if (word[i] === guess[i]) {
      result[i].status = "match";
      word[i] = "";
    }
  }

  // Check for includes
  for (let i = 0; i < guess.length; i++) {
    if (result[i].status === "miss" && word.includes(guess[i])) {
      result[i].status = "include";
      const index = word.findIndex((l: string) => l === guess[i]);
      word[index] = "";
    }
  }

  return result;
}

export function isWin(result: ResolvedWordGuess) {
  return result.every(({ status }) => status === "match");
}

export function isLoss(previousGuesses: ResolvedWordGuess[]) {
  return previousGuesses.length === 5;
}

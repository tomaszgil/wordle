export type LetterStatus = "match" | "include" | "miss";
export type ResolvedLetterGuess = { letter: string; status: LetterStatus };
export type ResolvedWordGuess = ResolvedLetterGuess[];
export type ResolvedWordGuesses = ResolvedWordGuess[];

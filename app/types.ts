export type GameStatus = "play" | "win" | "loss";
export type LetterStatus = "match" | "include" | "miss";
export type LetterGuess = { letter: string; status?: LetterStatus };
export type ResolvedLetterGuess = { letter: string; status: LetterStatus };
export type ResolvedWordGuess = ResolvedLetterGuess[];

import { json, redirect, useActionData, useLoaderData } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import type { ResolvedWordGuess, ResolvedWordGuesses } from "~/types";
import { Tile } from "~/components/Tile";
import { Grid } from "~/components/Grid";
import { getSession, commitSession } from "~/sessions";

const word = "point";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("status")) {
    session.set("status", "play");
    session.set("guesses", []);
    session.set("word", "");
  }

  return json(
    {
      guesses: session.get("guesses"),
      status: session.get("status"),
      word: session.get("word"),
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const guess = formData.get("word");

  if (typeof guess !== "string") {
    return json(
      { message: "Guess must be of type string" },
      {
        status: 400,
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }
  if (guess.length !== 5) {
    return json(
      { message: "Guess must be of length 5" },
      {
        status: 400,
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }

  const result: ResolvedWordGuess = [];

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    result.push({
      letter,
      status:
        word[i] === letter
          ? "match"
          : word.includes(letter)
          ? "include"
          : "miss",
    });
  }

  const previousGuesses = session.get("guesses");

  if (result.every(({ status }) => status === "match")) {
    session.set("status", "win");
  } else if (previousGuesses.length === 4) {
    session.set("status", "loss");
    session.set("word", word);
  }

  session.set("guesses", [...previousGuesses, result]);

  return redirect("/play", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Play() {
  const data = useLoaderData<{
    guesses: ResolvedWordGuesses;
    status: "play" | "win" | "loss";
  }>();
  const resolvedGuesses = data?.guesses?.flat() ?? [];

  console.log(data);

  return (
    <div>
      <h1>Play</h1>
      <form method="post">
        <label>
          Guess: <input type="text" name="word" />
        </label>
        <button type="submit">Try</button>
      </form>
      <div className="flex justify-center">
        {data?.status}
        <Grid>
          {resolvedGuesses.map(({ letter, status }, index) => (
            <Tile key={index} status={status}>
              {letter.toUpperCase()}
            </Tile>
          ))}
          {new Array(25 - resolvedGuesses.length)
            .fill(" ")
            .map((child, index) => (
              <Tile key={index}>&nbsp;</Tile>
            ))}
        </Grid>
      </div>
    </div>
  );
}

import React from "react";
import { json, Outlet, redirect, useLoaderData, Form } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import type { ResolvedWordGuess, ResolvedWordGuesses } from "~/types";
import { Tile } from "~/components/Tile";
import { Grid } from "~/components/Grid";
import { getSession, commitSession } from "~/sessions";

const word = "point";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return json(
    {
      guesses: session.get("guesses") ?? [],
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

  const previousGuesses = session.get("guesses") ?? [];
  session.set("guesses", [...previousGuesses, result]);

  if (result.every(({ status }) => status === "match")) {
    return redirect("/play/win", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else if (previousGuesses.length === 4) {
    return redirect("/play/loss", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

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

  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <h1>Play</h1>
      <Form reloadDocument method="post">
        <fieldset disabled={["win", "loss"].includes(data?.status)}>
          <label>
            Guess:{" "}
            <input
              ref={inputRef}
              type="text"
              name="word"
              value={input}
              maxLength={5}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
        </fieldset>
      </Form>
      <div className="flex justify-center mb-4">
        <Grid>
          {resolvedGuesses.map(({ letter, status }, index) => (
            <Tile key={index} status={status}>
              {letter.toUpperCase()}
            </Tile>
          ))}
          {input.split("").map((letter) => (
            <Tile key={letter}>{letter.toUpperCase()}</Tile>
          ))}
          {new Array(25 - input.length - resolvedGuesses.length)
            .fill("")
            .map((child, index) => (
              <Tile key={index}>&nbsp;</Tile>
            ))}
        </Grid>
      </div>
      <Outlet />
    </div>
  );
}

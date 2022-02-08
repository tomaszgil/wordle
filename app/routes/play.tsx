import React from "react";
import {
  json,
  Outlet,
  redirect,
  useLoaderData,
  Form,
  useActionData,
} from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import type { ResolvedWordGuess, ResolvedWordGuesses } from "~/types";
import { Tile } from "~/components/Tile";
import { Grid } from "~/components/Grid";
import { getSession, commitSession, destroySession } from "~/sessions";
import { getRandomWord, inWordList } from "~/words";
import { DismissableAlert } from "~/components/DismissableAlert";
import { Button } from "~/components/Button";
import { Mark } from "~/components/Mark";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("word")) {
    session.set("word", getRandomWord());
  }
  if (!session.has("guesses")) {
    session.set("guesses", []);
  }
  if (!session.has("status")) {
    session.set("status", "play");
  }

  return json(
    {
      guesses: session.get("guesses"),
      status: session.get("status"),
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
  const { _action, word: guess } = Object.fromEntries(formData);

  if (_action === "reset") {
    return redirect("/play", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  if (typeof guess !== "string") {
    return json(
      { error: "Guess must be of type string" },
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
      { error: "Guess must be of length 5" },
      {
        status: 400,
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }
  if (!inWordList(guess)) {
    return json(
      { error: "Guess is not in word list" },
      {
        status: 400,
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }

  const word = session.get("word").split("");
  const result: ResolvedWordGuess = guess.split("").map((letter: string) => ({
    letter,
    status: "miss",
  }));

  // Check for matches
  for (let i = 0; i < guess.length; i++) {
    if (word[i] === guess[i]) {
      result[i].status = "match";
      word[i] = undefined;
    }
  }

  // Check for includes
  for (let i = 0; i < guess.length; i++) {
    if (word.includes(guess[i])) {
      result[i].status = "include";
      const index = word.findIndex((l: string) => l === guess[i]);
      word[index] = undefined;
    }
  }

  const previousGuesses = session.get("guesses") ?? [];
  session.set("guesses", [...previousGuesses, result]);

  if (result.every(({ status }) => status === "match")) {
    session.set("status", "win");
    return redirect("/play/win", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else if (previousGuesses.length === 5) {
    session.set("status", "loss");
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
  const actionData = useActionData();
  const resolvedGuesses = data?.guesses?.flat() ?? [];

  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="my-8 mx-4">
      <Form
        method="post"
        autoComplete="off"
        className="h-0 overflow-hidden"
        onSubmit={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
      >
        <fieldset disabled={["win", "loss"].includes(data?.status)}>
          <label>
            Guess:{" "}
            <input
              ref={inputRef}
              type="text"
              name="word"
              value={input}
              maxLength={5}
              onBlur={() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              onChange={(e) => setInput(e.target.value.toLowerCase())}
            />
          </label>
        </fieldset>
      </Form>
      <div className="flex justify-center">
        <div>
          <div className="mb-8 flex items-center gap-4 justify-between">
            <span>
              Press <Mark>Enter</Mark> to submit...
            </span>
            <Form method="post">
              <Button
                type="submit"
                variant="secondary"
                name="_action"
                disabled={!resolvedGuesses.length}
                value="reset"
              >
                Reset
              </Button>
            </Form>
          </div>
          <Grid>
            {resolvedGuesses.map(({ letter, status }, index) => (
              <Tile key={`${index}-${letter}`} status={status}>
                {letter.toUpperCase()}
              </Tile>
            ))}
            {input.split("").map((letter, index) => (
              <Tile key={`${index}-${letter}`}>{letter.toUpperCase()}</Tile>
            ))}
            {new Array(30 - input.length - resolvedGuesses.length)
              .fill("")
              .map((_, index) => (
                <Tile key={index}>&nbsp;</Tile>
              ))}
          </Grid>
          {actionData?.error && (
            <div className="mt-8">
              <DismissableAlert status="error">
                {actionData.error}
              </DismissableAlert>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

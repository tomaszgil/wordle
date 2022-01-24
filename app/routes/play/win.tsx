import React from "react";
import { redirect } from "remix";
import type { ActionFunction } from "remix";
import { getSession, destroySession } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/play", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export default function Win() {
  return (
    <div>
      <h2>Congratulations 🎉</h2>
      <form method="post">
        <button type="submit">Play again</button>
      </form>
    </div>
  );
}

import React from "react";
import { redirect } from "remix";
import type { ActionFunction } from "remix";
import { getSession, destroySession } from "~/sessions";
import { Dialog } from "~/components/Dialog";
import { Button } from "~/components/Button";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/play", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export default function Loss() {
  return (
    <Dialog>
      <div className="text-center">
        <div className="text-8xl mb-4">🥺</div>
        <h2 className="text-3xl mb-4 font-semibold">Ooops...</h2>
        <p className="max-w-lg mb-6">
          That was hard. Typically you wouldn't be able to play again. Here you
          can acutally try again!
        </p>
        <form method="post">
          <Button type="submit">Play again</Button>
        </form>
      </div>
    </Dialog>
  );
}

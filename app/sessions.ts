import { createCookieSessionStorage, redirect } from "remix";
import { GameStatus } from "./types";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      sameSite: "lax",
      path: "/play",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };

export async function requireSessionStatus(
  request: Request,
  requiredStatus: GameStatus
) {
  const session = await getSession(request.headers.get("Cookie"));
  const status = session.get("status");

  if (status !== requiredStatus) {
    throw new redirect("/play");
  }

  return session;
}

import { Link } from "remix";

export default function Index() {
  return (
    <>
      <h1>Welcome to Remix</h1>
      <Link to="/play">Play</Link>
    </>
  );
}

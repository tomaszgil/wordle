import { Link } from "remix";
import { Button } from "~/components/Button";
import { Logo } from "~/components/Logo";

export default function Index() {
  return (
    <>
      <h1 className="mb-4">
        <Logo size="lg" />
      </h1>
      <Link to="/play">Play</Link>
    </>
  );
}

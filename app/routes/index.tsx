import { Link } from "remix";
import { styles as buttonStyles } from "~/components/Button";
import { Illustration } from "~/components/Illustration";

export default function Index() {
  return (
    <main className="text-center flex justify-center">
      <div>
        <div className="mt-16 mb-12">
          <Illustration />
        </div>
        <p className="text-4xl font-bold leading-none mb-12 max-w-lg">
          Your favourite word game. Expect now you can just{" "}
          <span className="text-sky-400">keep playing</span>.
        </p>
        <Link to="/play" className={buttonStyles({ size: "lg" })}>
          Let's play!
        </Link>
      </div>
    </main>
  );
}

import { Link, LoaderFunction } from "remix";
import { styles as buttonStyles } from "~/components/Button";

export const loader: LoaderFunction = async () => {
  return new Response("Not Found", {
    status: 404,
  });
};

export default function Fallback() {
  return (
    <main className="text-center flex justify-center">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mt-16 mb-4">
          Something's missing...
        </h1>
        <p className="mb-6 text-lg">
          We couldn't find the page you were looking for. Maybe it was never
          here in the first place.
        </p>
        <Link to="/" className={buttonStyles({ size: "lg" })}>
          Go home
        </Link>
      </div>
    </main>
  );
}

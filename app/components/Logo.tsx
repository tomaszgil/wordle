import classNames from "classnames";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "sm" }: LogoProps) {
  return (
    <div
      className={classNames("inline-flex flex-col items-center", {
        "text-base": size === "sm",
        "text-xl": size === "md",
        "text-4xl": size === "lg",
      })}
    >
      <span className="text-sky-400 text-[0.875em] uppercase font-bold leading-none">
        Infinite
      </span>
      <span className="text-[1.125em] uppercase font-bold leading-none">
        Wordle
      </span>
    </div>
  );
}

import { ReactNode } from "react";
import classNames from "classnames";
import { LetterStatus } from "~/types";

interface TileProps {
  children?: ReactNode;
  status?: LetterStatus;
  delay?: number;
}

export function Tile({ children, status, delay = 0 }: TileProps) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={classNames(
        "w-16 h-16 text-xl font-bold rounded-md flex items-center justify-center transition-colors ease-out",
        {
          "bg-green-400": status === "match",
          "bg-yellow-400": status === "include",
          "bg-gray-400": status === "miss",
          "bg-gray-100": !status,
        }
      )}
    >
      {children}
    </div>
  );
}

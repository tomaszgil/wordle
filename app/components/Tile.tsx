import classNames from "classnames";
import React from "react";
import { LetterStatus } from "~/types";

interface TileProps {
  children?: React.ReactNode;
  status?: LetterStatus;
}

export function Tile({ children, status }: TileProps) {
  return (
    <div
      className={classNames(
        "w-16 h-16 text-xl font-bold rounded-md flex items-center justify-center transition-colors delay-300 ease-out",
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

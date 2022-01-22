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
        "w-16 h-16 text-xl rounded-md shadow-lg  flex items-center justify-center",
        {
          "bg-green-300": status === "match",
          "bg-yellow-300": status === "include",
          "bg-gray-300": status === "miss",
        }
      )}
    >
      {children}
    </div>
  );
}

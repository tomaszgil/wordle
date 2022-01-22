import classNames from "classnames";
import React from "react";
import { LetterStatus } from "~/types";

interface GridProps {
  children: React.ReactNode;
}

export function Grid({ children }: GridProps) {
  return <div className="grid grid-cols-5 gap-4">{children}</div>;
}

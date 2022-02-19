import { ReactNode } from "react";

interface MarkProps {
  children?: ReactNode;
}

export function Mark({ children }: MarkProps) {
  return (
    <mark className="bg-sky-100 text-sky-700 rounded-md p-1">{children}</mark>
  );
}

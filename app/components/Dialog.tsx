import { useRef, ReactNode } from "react";
import { useKeyDown } from "~/hooks/useKeyDown";
import { useOutsideClick } from "~/hooks/useOutsideClick";

interface DialogProps {
  children: ReactNode;
  onClose: () => void;
}

export function Dialog({ children, onClose }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);
  useKeyDown("Escape", onClose);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black/80 w-100 h-100 flex justify-center items-start">
      <div
        ref={ref}
        role="dialog"
        className="mx-auto my-12 p-12 rounded-md bg-white inline-block"
      >
        {children}
      </div>
    </div>
  );
}

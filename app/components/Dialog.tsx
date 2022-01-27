import React from "react";

interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children }: DialogProps) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black/80 w-100 h-100 flex justify-center items-start">
      <div
        role="dialog"
        className="mx-auto my-12 p-12 rounded-md bg-white inline-block"
      >
        {children}
      </div>
    </div>
  );
}

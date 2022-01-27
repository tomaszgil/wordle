import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button
      className="px-6 py-3 rounded-lg  text-white bg-sky-500 hover:bg-sky-600 transition-colors"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

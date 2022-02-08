import classNames from "classnames";
import React, { HTMLProps } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  onClick,
  disabled,
  ...props
}: ButtonProps & HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className={classNames("px-6 py-3 rounded-lg transition-colors", {
        "text-white bg-sky-500 hover:bg-sky-600": variant === "primary",
        "hover:bg-sky-600": variant === "primary" && !disabled,
        "bg-sky-100": variant === "secondary",
        "hover:bg-sky-200": variant === "secondary" && !disabled,
        "opacity-50": disabled,
      })}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

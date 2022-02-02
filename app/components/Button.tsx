import classNames from "classnames";
import React, { HTMLProps } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
        "bg-sky-100 hover:bg-sky-200": variant === "secondary",
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

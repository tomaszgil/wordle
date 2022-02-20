import { HTMLProps } from "react";
import classNames from "classnames";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit" | "reset";
}

interface ButtonStyles {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
}

export const styles = ({
  variant = "primary",
  size = "md",
  disabled = false,
}: ButtonStyles = {}) =>
  classNames(
    "inline-block rounded-lg transition-colors leading-tight",
    {
      "text-white bg-sky-500 hover:bg-sky-600": variant === "primary",
      "hover:bg-sky-600": variant === "primary" && !disabled,
      "bg-sky-100": variant === "secondary",
      "hover:bg-sky-200": variant === "secondary" && !disabled,
      "opacity-50": disabled,
    },
    {
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
    }
  );

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={styles({ variant, disabled, size })}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

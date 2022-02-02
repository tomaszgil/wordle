import classNames from "classnames";
import React, { useState } from "react";
import {
  MdError,
  MdCheckCircle,
  MdWarning,
  MdInfo,
  MdClose,
} from "react-icons/md";

interface DialogProps {
  status: "success" | "warning" | "error" | "info";
  children: React.ReactNode;
}

const statusToIcon = {
  success: MdCheckCircle,
  error: MdError,
  warning: MdWarning,
  info: MdInfo,
};

export function DismissableAlert({ status = "info", children }: DialogProps) {
  const [open, setOpen] = useState(true);
  const Icon = statusToIcon[status];

  return open ? (
    <div
      role="alert"
      className={classNames(
        "rounded-md p-4 border-l-4f flex gap-4 items-center",
        {
          "bg-red-100 border-red-500": status === "error",
          "bg-yellow-100 border-yellow-500": status === "warning",
          "bg-green-100 border-green-500": status === "success",
          "bg-sky-100 border-sky-500": status === "info",
        }
      )}
    >
      <Icon
        className={classNames({
          "text-red-500": status === "error",
          "text-yellow-500": status === "warning",
          "text-green-500": status === "success",
          "text-sky-500": status === "info",
        })}
      />
      <div className="flex-1">{children}</div>
      <button onClick={() => setOpen(false)} aria-label="Dismiss">
        <MdClose />
      </button>
    </div>
  ) : null;
}

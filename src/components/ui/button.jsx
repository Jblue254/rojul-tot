import * as React from "react";

export function Button({
  className = "",
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md bg-[#162427] px-4 py-2 text-white font-medium hover:bg-[#223538] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
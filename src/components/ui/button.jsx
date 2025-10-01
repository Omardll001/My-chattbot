import React from "react";

export function Button({ className = "", children, variant = "filled", ...props }) {
  let baseStyles = "px-4 py-2 rounded font-medium transition ";

  // Handle variant styles
  if (variant === "outline") {
    baseStyles += "border border-indigo-400 text-indigo-400 bg-transparent hover:bg-indigo-500 hover:text-white ";
  } else if (variant === "filled") {
    baseStyles += "bg-indigo-500 text-white hover:bg-indigo-600 ";
  } else {
    baseStyles += ""; // custom or additional variants
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}

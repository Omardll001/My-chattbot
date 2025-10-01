import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-2xl shadow-lg transition ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

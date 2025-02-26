import React from "react";

export function Switch({ checked, onCheckedChange, className }) {
  return (
    <button
      onClick={onCheckedChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked
          ? "bg-blue-500 dark:bg-[#5a80e1] dark:hover:bg-[#5a80e1]/90"
          : "bg-gray-300"
      } ${className}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

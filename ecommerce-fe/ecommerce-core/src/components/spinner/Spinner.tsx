import React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "white";
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "medium", color = "primary" }) => {
  const sizeClasses = {
    small: "core-w-5 core-h-5",
    medium: "core-w-8 core-h-8",
    large: "core-w-12 core-h-12",
  };

  const colorClasses = {
    primary: "core-text-indigo-600",
    secondary: "core-text-gray-600",
    white: "core-text-white",
  };

  return (
    <div className="core-flex core-items-center core-justify-center core-min-h-[100px]">
      <div className={`core-animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}>
        <svg
          className="core-w-full core-h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="core-opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="core-opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
};

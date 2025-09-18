import React from "react";

const LoadingSpinner = ({
  size = "md",
  text = "Loading...",
  color = "blue",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-600",
    green: "border-green-600",
    gray: "border-gray-600",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-3">
        <div
          className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${colorClasses[color]}`}
        ></div>
        {text && (
          <span className="text-sm text-gray-600 font-medium">{text}</span>
        )}
      </div>
    </div>
  );
};

export const SkeletonLoader = ({ rows = 5 }) => {
  <div className="animate-pulse space-y-4">
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
    ))}
  </div>;
};

export default LoadingSpinner;

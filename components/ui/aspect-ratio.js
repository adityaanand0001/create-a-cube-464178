
import React from "react";

export const AspectRatio = ({ ratio = 1, children, className = "" }) => {
  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: `${100 / ratio}%` }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

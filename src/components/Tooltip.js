// components/Tooltip.jsx
import { useState } from "react";

const Tooltip = ({ text, children, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Position classes mapping
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-flex">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex"
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute z-10 px-2 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm whitespace-nowrap ${positionClasses[position]}`}
        >
          {text}
          <div
            className={`absolute ${
              position === "top"
                ? "top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent"
                : position === "bottom"
                ? "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent"
                : position === "left"
                ? "left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent"
                : "right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent"
            } w-2 h-2 border-4`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

import React, { useEffect } from "react";
import { MdErrorOutline, MdClose } from "react-icons/md"; // Example icon

const Toast = ({ message, type = "error", duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500"; // Add more types as needed
  const Icon = type === "error" ? MdErrorOutline : null; // Add icons for other types

  return (
    <div
      className={`flex items-center justify-between w-full max-w-xs p-4 mb-4 text-white ${bgColor} rounded-lg shadow-lg`}
      role="alert"
    >
      <div className="flex items-center">
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        <div className="text-sm font-normal">{message}</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-white hover:text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-white/20 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <MdClose className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;

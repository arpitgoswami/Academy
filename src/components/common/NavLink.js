import Link from "next/link";

/**
 * NavLink component for consistent navigation link styling across the app
 * @param {Object} props
 * @param {string} props.text - The text to display
 * @param {string} props.href - The link destination
 * @param {React.ReactNode} [props.icon] - Optional icon to display
 * @param {boolean} [props.isActive] - Whether the link is active
 * @param {string} [props.className] - Additional CSS classes
 */
export const NavLink = ({ text, href, icon, isActive, className = "" }) => {
  const baseClasses = "transition-colors duration-200";
  const defaultClasses = icon
    ? "flex items-center py-2.5 px-4 rounded-lg w-full text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
    : "hover:text-black hover:underline py-1";

  const activeClasses = icon
    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
    : "";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${defaultClasses} ${
        isActive ? activeClasses : ""
      } ${className}`}
      aria-label={text}
    >
      {icon && (
        <div
          className={`w-5 mr-3 flex-shrink-0 transition-colors ${
            isActive
              ? "text-teal-600 dark:text-teal-400"
              : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
          }`}
        >
          {icon}
        </div>
      )}
      <span>{text}</span>
    </Link>
  );
};

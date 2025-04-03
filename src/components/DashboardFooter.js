export default function DashboardFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-sm text-slate-500 mt-auto">
      {" "}
      {/* Added mt-auto */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 flex-wrap">
          {" "}
          {/* Added flex-wrap and adjusted spacing */}
          <a
            href="#"
            className="hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            {" "}
            {/* Added py-1 for wrap spacing */}
            Pro
          </a>
          <a
            href="#"
            className="hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            Enterprise
          </a>
          <a
            href="#"
            className="hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            API
          </a>
          <a
            href="#"
            className="hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            Blog
          </a>
          <a
            href="#"
            className="hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            Careers
          </a>
          <a
            href="#"
            className="hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            Store
          </a>
          <a
            href="#"
            className="hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            Finance
          </a>
          <div className="flex items-center py-1">
            <span>English</span>
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

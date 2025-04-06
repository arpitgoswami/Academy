export default function DashboardFooter() {
  const links = [
    "Pro",
    "Enterprise",
    "API",
    "Careers",
    "Store",
    "Privacy Policy",
  ];

  return (
    <footer className="dark:border-slate-800 py-4 text-center text-[0.80rem] text-slate-500 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 flex-wrap">
          {links.map((text, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:text-slate-700 hover:underline dark:hover:text-slate-300 py-1"
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

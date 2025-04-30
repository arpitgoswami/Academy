import Link from "next/link";

export default function DashboardFooter() {
  const links = [
    { text: "Pro", href: "/pricing" },
    { text: "Enterprise", href: "/pricing" },
    { text: "API", href: "/api-docs" },
    { text: "Careers", href: "/careers" },
    { text: "Store", href: "/store" },
    { text: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="py-6 text-center text-[0.80rem] text-gray-400 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 flex-wrap gap-y-2">
          {links.map(({ text, href }, idx) => (
            <Link
              key={idx}
              href={href}
              className="hover:text-white hover:underline transition-colors duration-300 py-1"
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

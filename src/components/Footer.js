import { NavLink } from "./common/NavLink";

export default function Footer() {
  const links = [
    { text: "Github", href: "https://github.com/arpitgoswami/academy" },
    { text: "Help & Support", href: "/support" },
    { text: "Privacy Policy", href: "/legal/privacy" },
    { text: "Terms of Service", href: "/legal/terms" },
  ];

  return (
    <footer className="py-6 text-center text-[0.80rem] text-gray-400 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 flex-wrap gap-y-2">
          {links.map(({ text, href }) => (
            <NavLink
              key={text}
              text={text}
              href={href}
              className="text-gray-400"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

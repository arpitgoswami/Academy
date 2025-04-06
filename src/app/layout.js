import { Inter } from "next/font/google";

import "./styles/globals.css";
import "./styles/custom.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Academy - Simplify Research & Lesson Planning",
  description:
    "Academy streamlines research for university teachers by generating notes, code snippets, and conducting web searches. Save time and enhance your scholarly work effortlessly.",
};

export const viewport = {
  themeColor: "#1a0017",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleNewThread = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewThread={handleNewThread}
      />
      <main className="flex-1 md:ml-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}

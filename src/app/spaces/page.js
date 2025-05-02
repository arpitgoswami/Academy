"use client";

import { useState } from "react";
import { RiLightbulbLine, RiTeamLine, RiBookletLine } from "react-icons/ri";
import Image from "next/image";
import Header from "@/components/Header";

const demoSpaces = [
  {
    id: 1,
    name: "Research Hub",
    description:
      "Collaborative space for academic research and paper discussions",
    members: 156,
    topics: ["Research", "Academia", "Publications"],
    image: "/background.png",
  },
  {
    id: 2,
    name: "Tech Innovation",
    description:
      "Exploring cutting-edge technology and its applications in education",
    members: 89,
    topics: ["Technology", "Innovation", "EdTech"],
    image: "/background.png",
  },
  {
    id: 3,
    name: "Teaching Methods",
    description: "Share and discuss modern teaching methodologies",
    members: 234,
    topics: ["Pedagogy", "Methods", "Learning"],
    image: "/background.png",
  },
  {
    id: 4,
    name: "Student Success",
    description: "Strategies for improving student engagement and outcomes",
    members: 167,
    topics: ["Student Support", "Engagement", "Success"],
    image: "/background.png",
  },
  {
    id: 5,
    name: "Data Science",
    description: "Exploring data analysis and machine learning in education",
    members: 143,
    topics: ["Data", "Analytics", "ML"],
    image: "/background.png",
  },
  {
    id: 6,
    name: "Digital Learning",
    description: "Best practices for online and hybrid learning environments",
    members: 198,
    topics: ["Online", "Digital", "Hybrid"],
    image: "/background.png",
  },
];

export default function SpacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filteredSpaces = demoSpaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Header onMenuClick={toggleSidebar} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpaces.map((space) => (
            <article
              key={space.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-[2/1] relative w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {space.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {space.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <RiTeamLine className="mr-1.5 h-4 w-4" />
                    <span>{space.members} members</span>
                  </div>
                  <div className="flex gap-2">
                    {space.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

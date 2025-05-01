"use client";

import { useState } from "react";
import { BiLibrary, BiTime, BiFile, BiFolder } from "react-icons/bi";
import { MdOutlineArticle } from "react-icons/md";
import { AiOutlineCode } from "react-icons/ai";

const demoResources = [
  {
    id: 1,
    type: "article",
    title: "Advanced Teaching Methodologies",
    description:
      "Comprehensive guide to modern teaching techniques and approaches",
    savedAt: "2024-04-28",
    category: "Teaching",
    icon: MdOutlineArticle,
  },
  {
    id: 2,
    type: "code",
    title: "Data Analysis Scripts",
    description: "Collection of Python scripts for educational data analysis",
    savedAt: "2024-04-27",
    category: "Code",
    icon: AiOutlineCode,
  },
  {
    id: 3,
    type: "document",
    title: "Research Paper Template",
    description:
      "Standard template for academic research papers with guidelines",
    savedAt: "2024-04-26",
    category: "Research",
    icon: BiFile,
  },
  {
    id: 4,
    type: "article",
    title: "Student Engagement Strategies",
    description:
      "Best practices for increasing student participation and engagement",
    savedAt: "2024-04-25",
    category: "Teaching",
    icon: MdOutlineArticle,
  },
  {
    id: 5,
    type: "code",
    title: "Interactive Visualization Tools",
    description: "JavaScript libraries for creating educational visualizations",
    savedAt: "2024-04-24",
    category: "Code",
    icon: AiOutlineCode,
  },
  {
    id: 6,
    type: "document",
    title: "Course Planning Guide",
    description:
      "Comprehensive guide for semester planning and curriculum design",
    savedAt: "2024-04-23",
    category: "Planning",
    icon: BiFile,
  },
];

const categories = [
  { name: "All", count: demoResources.length },
  {
    name: "Teaching",
    count: demoResources.filter((r) => r.category === "Teaching").length,
  },
  {
    name: "Research",
    count: demoResources.filter((r) => r.category === "Research").length,
  },
  {
    name: "Code",
    count: demoResources.filter((r) => r.category === "Code").length,
  },
  {
    name: "Planning",
    count: demoResources.filter((r) => r.category === "Planning").length,
  },
];

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = demoResources.filter(
    (resource) =>
      (selectedCategory === "All" || resource.category === selectedCategory) &&
      (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center">
              <BiLibrary className="h-8 w-8 text-teal-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Library
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Your saved resources and documents
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-teal-500 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {filteredResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <article
                key={resource.id}
                className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700">
                    <Icon className="w-6 h-6 text-teal-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {resource.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center">
                        <BiTime className="mr-1.5 h-4 w-4" />
                        <time>{formatDate(resource.savedAt)}</time>
                      </div>
                      <div className="flex items-center">
                        <BiFolder className="mr-1.5 h-4 w-4" />
                        <span>{resource.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

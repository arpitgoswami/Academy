"use client";

import { useState, useEffect } from "react";
import { fetchNewsArticles } from "@/services/newsService";
import { BiTime, BiLink, BiLoader } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function DiscoverPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchNewsArticles();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError("Failed to load news articles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <BiLoader className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="w-full md:ml-64 max-w-7xl mx-auto px-4 py-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article
              key={index}
              className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video relative w-full overflow-hidden">
                <img
                  src={article.urlToImage}
                  alt="Image Not Found"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                {/* Source logo/badge overlay */}
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                  {article.url.includes("aajtak") ? "आज तक" : "News"}
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {article.title}
                </h2>

                <div className="flex items-center justify-between mt-4 border-t pt-3 border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="truncate max-w-[120px]">
                      {article.url.slice(8, 28)}
                    </span>
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Read More
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

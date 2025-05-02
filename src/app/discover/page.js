"use client";

import { useState, useEffect } from "react";
import { BiSearch, BiLoader, BiRefresh } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { fetchNewsArticles } from "@/services/newsService";

// News source logos mapping
const sourceLogos = {
  "bbc.co.uk": "/logos/bbc.png",
  "cnn.com": "/logos/cnn.png",
  aajtak: "/logos/aajtak.png",
  "nytimes.com": "/logos/nyt.png",
  "theguardian.com": "/logos/guardian.png",
  "washingtonpost.com": "/logos/wp.png",
  "reuters.com": "/logos/reuters.png",
};

// Get appropriate logo for article URL
const getSourceLogo = (url) => {
  for (const [domain, logo] of Object.entries(sourceLogos)) {
    if (url.includes(domain)) {
      return logo;
    }
  }
  return null;
};

// Get source name from URL
const getSourceName = (url) => {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return (
        parts[parts.length - 2].charAt(0).toUpperCase() +
        parts[parts.length - 2].slice(1)
      );
    }
    return hostname;
  } catch (e) {
    return url.split("/")[2] || "News Source";
  }
};

export default function DiscoverPage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories] = useState(["All", "Business", "Technology"]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchNewsArticles();

        // Add random categories for demo purposes
        const articlesWithCategories = data.map((article) => ({
          ...article,
          category:
            categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
          publishedAt: article.publishedAt || new Date().toISOString(),
        }));

        setArticles(articlesWithCategories);
        setFilteredArticles(articlesWithCategories);
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

  useEffect(() => {
    let result = [...articles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          (article.description &&
            article.description.toLowerCase().includes(query))
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((article) => article.category === activeCategory);
    }

    setFilteredArticles(result);
  }, [searchQuery, activeCategory, articles]);

  const refreshArticles = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchNewsArticles();

      const articlesWithCategories = data.map((article) => ({
        ...article,
        category:
          categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
        publishedAt: article.publishedAt || new Date().toISOString(),
      }));

      setArticles(articlesWithCategories);
      setFilteredArticles(articlesWithCategories);
      setError(null);
    } catch (err) {
      setError("Failed to refresh news articles");
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "Unknown date";
    }
  };

  const timeAgo = (dateString) => {
    try {
      const now = new Date();
      const past = new Date(dateString);
      const diffMs = now - past;

      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 60) return `${diffMins} mins ago`;

      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hours ago`;

      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 30) return `${diffDays} days ago`;

      return formatDate(dateString);
    } catch {
      return "Recently";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header onMenuClick={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        <div className="w-full md:ml-64 max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <IoNewspaperOutline className="w-16 h-16 text-teal-500 mb-4" />
          <BiLoader className="w-8 h-8 text-teal-500 animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Loading the latest news...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header onMenuClick={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        <div className="w-auto md:ml-64 px-8 py-8">
          <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md">
            <div className="inline-block p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <IoNewspaperOutline className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {error}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We're having trouble loading the latest news. Please try again
              later.
            </p>
            <button
              onClick={refreshArticles}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="w-auto md:ml-64 px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center">
            <IoNewspaperOutline className="mr-2" /> Discover News
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Stay updated with the latest news from various sources
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-2xl">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <BiSearch className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Filter controls */}
          <div className="flex flex-wrap items-center gap-3 justify-between">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-teal-500 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Refresh button */}
            <div className="flex items-center gap-3">
              <button
                onClick={refreshArticles}
                disabled={isRefreshing}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium transition-colors"
              >
                <BiRefresh
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"} found
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            {searchQuery ? ` for "${searchQuery}"` : ""}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video relative w-full overflow-hidden">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt="Image not available."
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <IoNewspaperOutline className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-0 left-0 bg-teal-500 text-white text-xs font-medium px-2.5 py-1 m-2 rounded">
                    {article.category}
                  </div>

                  {/* Source logo/badge overlay */}
                  <div className="absolute bottom-0 right-0 m-2">
                    {getSourceLogo(article.url) ? (
                      <div className="h-6 w-6 bg-white dark:bg-slate-800 rounded-full p-0.5 shadow">
                        <img
                          src={getSourceLogo(article.url)}
                          alt={getSourceName(article.url)}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                        {getSourceName(article.url)}
                      </div>
                    )}
                  </div>

                  {/* Time ago badge */}
                  <div className="absolute top-0 right-0 bg-black/60 text-white text-xs flex items-center px-2 py-1 m-2 rounded">
                    <Clock className="w-3 h-3 mr-1" />
                    {timeAgo(article.publishedAt)}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {article.title}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[2.5rem] mb-3">
                    {article.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>

                    <div className=" p-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors flex items-center gap-1 px-3">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium"
                      >
                        <ExternalLink className="w-3 h-3" /> Read
                      </a>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
              <BiSearch className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">
              No articles found
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search or category filters
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

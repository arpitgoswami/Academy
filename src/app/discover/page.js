"use client";

import { useState, useEffect } from "react";
import { fetchNewsArticles } from "@/services/newsService";
import { BiTime, BiLink, BiLoader } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import Image from "next/image";

export default function DiscoverPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center">
              <IoNewspaperOutline className="h-8 w-8 text-teal-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Discover
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Stay updated with the latest news and insights
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-[16/9] relative w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                <Image
                  src={article.image || "/background.png"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500">
                  <div className="flex items-center">
                    <BiTime className="mr-1.5 h-4 w-4" />
                    <time>{formatDate(article.publishedAt)}</time>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-medium"
                  >
                    <BiLink className="mr-1.5 h-4 w-4" />
                    Read More
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

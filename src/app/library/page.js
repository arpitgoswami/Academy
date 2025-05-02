"use client";

import { useState, useEffect } from "react";
import { BiSearch, BiDownload, BiX } from "react-icons/bi";
import { MdOutlineCollections } from "react-icons/md";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      fetchTrendingImages();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  const fetchTrendingImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/images?query=trending&page=1`);
      const data = await response.json();
      setImages(data.results || []);
    } catch (error) {
      console.error("Error fetching trending images:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const searchImages = async (pageNumber) => {
    if (!searchQuery) return;

    try {
      setLoading(true);
      const response = await fetch(
        `/api/images?query=${encodeURIComponent(
          searchQuery
        )}&page=${pageNumber}`
      );
      const data = await response.json();

      if (pageNumber === 1) {
        setImages(data.results || []);
      } else {
        setImages((prev) => [...prev, ...(data.results || [])]);
      }
    } catch (error) {
      console.error("Error searching images:", error);
    } finally {
      setSearchResults(searchQuery);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    searchImages(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchImages(nextPage);
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="w-auto md:ml-64 px-8 py-8">
        {/* Search header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 md:text-center mb-6">
            Discover Amazing Images
          </h1>
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for images..."
              className="w-full px-4 py-4 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
            >
              <BiSearch className="w-5 h-5" />
            </button>
          </form>
        </header>

        {/* Collection stats */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
            <MdOutlineCollections className="mr-2" />
            {searchResults
              ? `Results for "${searchResults}"`
              : "Trending images"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {images.length} {images.length === 1 ? "image" : "images"} found
          </p>
        </div>

        {loading && page === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="aspect-square rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={image.urls.regular}
                  alt={image.alt_description}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onClick={() => openImageModal(image)}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm font-medium truncate">
                      {image.alt_description || "Untitled Image"}
                    </h3>
                    <p className="text-white/80 text-xs mt-1">
                      by {image.user?.name || "Unknown"}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                    <a
                      href={image.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:underline"
                    >
                      View on Unsplash
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(
                          image.urls.full,
                          `${image.alt_description || "unsplash-image"}.jpg`
                        );
                      }}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                      title="Download image"
                    >
                      <BiDownload className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more button */}
        {images.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loading && page > 1}
              className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto"
            >
              {loading && page > 1 ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

        {/* Image modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-slate-800 max-w-5xl w-full rounded-2xl overflow-hidden">
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full z-10"
              >
                <BiX className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/3 aspect-square md:aspect-auto">
                  <img
                    src={selectedImage.urls.regular}
                    alt={selectedImage.alt_description}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full md:w-1/3 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {selectedImage.alt_description || "Untitled Image"}
                  </h3>

                  <div className="mt-4 flex items-center">
                    {selectedImage.user?.profile_image?.medium && (
                      <img
                        src={selectedImage.user.profile_image.medium}
                        alt={selectedImage.user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {selectedImage.user?.name || "Unknown photographer"}
                      </p>
                      <a
                        href={selectedImage.user?.links?.html}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-500 hover:underline"
                      >
                        @{selectedImage.user?.username || "anonymous"}
                      </a>
                    </div>
                  </div>

                  {selectedImage.description && (
                    <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm">
                      {selectedImage.description}
                    </p>
                  )}

                  <div className="mt-4">
                    <h4 className="font-medium text-slate-700 dark:text-slate-200 mb-2">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-md text-slate-600 dark:text-slate-300"
                        >
                          {tag.title}
                        </span>
                      )) || (
                        <span className="text-sm text-slate-400">
                          No tags available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={() =>
                        handleDownload(
                          selectedImage.urls.full,
                          `${
                            selectedImage.alt_description || "unsplash-image"
                          }.jpg`
                        )
                      }
                      className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg flex items-center justify-center"
                    >
                      <BiDownload className="mr-2" /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No results state */}
        {!loading && images.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <BiSearch className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">
              No images found
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Try adjusting your search or explore trending images
            </p>
            <button
              onClick={fetchTrendingImages}
              className="mt-6 px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              Browse trending
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

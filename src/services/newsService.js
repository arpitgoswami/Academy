const NEWS_STORAGE_KEY = "news_articles";
const NEWS_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const getStoredNews = () => {
  const stored = localStorage.getItem(NEWS_STORAGE_KEY);
  if (!stored) return null;

  const { data, timestamp } = JSON.parse(stored);
  const isExpired = Date.now() - timestamp > NEWS_CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(NEWS_STORAGE_KEY);
    return null;
  }

  return data;
};

const storeNews = (articles) => {
  const newsData = {
    data: articles,
    timestamp: Date.now(),
  };
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsData));
};

export const fetchNewsArticles = async () => {
  try {
    // Check local storage first
    const storedArticles = getStoredNews();
    if (storedArticles) {
      console.log("Using cached news articles");
      return storedArticles;
    }

    const response = await fetch("/api/response");
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    // Store the articles in local storage
    storeNews(data);
    return data;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    throw error;
  }
};

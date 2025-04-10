import { NextResponse } from "next/server";

export async function GET(request) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.error("News API key is not defined in environment variables.");
    return NextResponse.json(
      { message: "Server configuration error: Missing API key" },
      { status: 500 }
    );
  }

  const newsApiUrl = `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(newsApiUrl, {
      // It's good practice to revalidate or cache appropriately
      // next: { revalidate: 3600 } // Revalidate every hour, for example
    });

    if (!response.ok) {
      // Log the error status and text for debugging
      const errorText = await response.text();
      console.error(
        `News API error: ${response.status} ${response.statusText}`,
        errorText
      );
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if articles exist and process the top two
    if (data.articles && Array.isArray(data.articles)) {
      const topTwoArticles = data.articles.slice(0, 2).map((article) => ({
        title: article.title,
        url: article.url,
        urlToImage: article.urlToImage,
      }));
      // Return only the processed top two articles
      return NextResponse.json(topTwoArticles);
    } else {
      // Return an empty array or appropriate response if no articles found
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error fetching from News API:", error);
    // Return a generic error response
    return NextResponse.json(
      { message: "Error fetching news data", error: error.message },
      { status: 500 }
    );
  }
}

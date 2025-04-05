// Force Node.js runtime for compatibility with cheerio
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import * as cheerio from "cheerio"; // Use namespace import for compatibility

const GOOGLE_API_KEY = "AIzaSyDptPbl5lxg3k6G-xntP61HsYGmaTcy1pE";
const SEARCH_ENGINE_ID = "43334efee04fd4767";
const GEMINI_API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4"; // Add Gemini Key

export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "chatgpt";

  const searchApiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
    query
  )}`;

  try {
    const searchResponse = await fetch(searchApiUrl);
    const searchData = await searchResponse.json();

    const items = searchData.items?.slice(0, 3) || [];

    const scrapedPages = await Promise.allSettled(
      items.map(async (item) => {
        try {
          const response = await fetch(item.link, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36",
            },
          });

          const html = await response.text();
          const $ = cheerio.load(html); // ✅ works in Node runtime only
          const bodyText = $("body")
            .text()
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 1000);

          return { link: item.link, content: bodyText };
        } catch (err) {
          return { link: item.link, error: err.message };
        }
      })
    );

    // 3. Combine scraped content for Gemini context
    let fullContext = "";
    const sourceLinks = []; // Keep track of links used for context
    scrapedPages.forEach((result) => {
      if (result.status === "fulfilled" && result.value.content) {
        fullContext += `\n\n=== Source: ${result.value.link} ===\n${result.value.content}`;
        sourceLinks.push(result.value.link);
      } else if (result.status === "rejected") {
        // Optionally log or include scraping errors in context if desired
        // fullContext += `\n\n=== Failed to scrape: ${result.reason.link} ===\nError: ${result.reason.error}`;
      }
    });

    if (!fullContext) {
      // Handle case where no content could be scraped
      return NextResponse.json(
        {
          question: query,
          answer:
            "Could not retrieve sufficient information from search results to answer.",
          sources: items.map((item) => item.link), // Still show attempted sources
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // 4. Ask Gemini
    const geminiPrompt = `Using the information below from multiple websites, answer the question in a concise and clear way.\n\nQuestion: ${query}\n\nInformation:\n${fullContext}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: geminiPrompt }] }],
          // Optional: Add safety settings or generation config if needed
          // safetySettings: [...],
          // generationConfig: {...}
        }),
      }
    );

    if (!geminiRes.ok) {
      const errorData = await geminiRes.text(); // Read error as text first
      console.error("Gemini API Error Response:", errorData);
      throw new Error(`Gemini API request failed: ${geminiRes.statusText}`);
    }

    const geminiData = await geminiRes.json();

    // Safely access the response text
    const aiResponse =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response based on the search results.";

    // 5. Send final result
    return NextResponse.json(
      {
        question: query,
        answer: aiResponse,
        sources: sourceLinks, // Return links that were successfully scraped and used
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

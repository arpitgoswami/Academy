export const runtime = "nodejs";

import { NextResponse } from "next/server";

const generateSuggestions = (query) => {
  const baseQuestions = [
    `What is ${query}?`,
    `How does ${query} work?`,
    `${query} examples`,
    `${query} tutorial`,
    `${query} best practices`,
    `Compare ${query}`,
    `${query} advantages and disadvantages`,
    `${query} alternatives`,
  ];

  // Filter out suggestions that are too similar to the query itself
  return baseQuestions.filter(
    (suggestion) =>
      suggestion.toLowerCase() !== query.toLowerCase() &&
      !suggestion.toLowerCase().startsWith(query.toLowerCase() + " ") &&
      !suggestion.toLowerCase().endsWith(" " + query.toLowerCase())
  );
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = generateSuggestions(query.trim());

    return NextResponse.json(
      { suggestions: suggestions.slice(0, 6) }, // Limit to 6 suggestions
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      }
    );
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

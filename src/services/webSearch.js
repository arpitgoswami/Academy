import { db } from "../app/firebase"; // Import Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Placeholder for Google API Key - Replace with your actual key
const GOOGLE_API_KEY = "AIzaSyDptPbl5lxg3k6G-xntP61HsYGmaTcy1pE";
// Placeholder for Google Custom Search Engine ID (if using CSE)
const SEARCH_ENGINE_ID = "43334efee04fd4767";

/**
 * Performs a web search using Google API and saves results to Firebase.
 * @param {string} query - The search query.
 * @param {object} user - The authenticated user object.
 * @returns {Promise<object>} - A promise that resolves with the search results (or summary).
 */
export const performWebSearch = async (query, user) => {
  console.log(`Performing web search for: "${query}"`);

  // --- Placeholder for Google Search API Call ---
  // Example using Custom Search JSON API endpoint
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Search API Error:", errorData);
      throw new Error(
        `Google Search API request failed: ${response.statusText}`
      );
    }
    const results = await response.json();
    console.log("Google Search API Results:", results);

    // --- Process Results (Example: taking top 3 snippets) ---
    const searchSnippets =
      results.items?.slice(0, 3).map((item) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      })) || [];

    // --- Save results/summary to Firebase ---
    // Decide on the data structure you want to save
    const searchDataToSave = {
      userId: user.uid,
      query: query,
      results: searchSnippets, // Save the processed snippets
      fullApiResponse: results, // Optionally save the full response
      createdAt: serverTimestamp(),
    };

    // Example: Saving to a 'webSearches' collection
    const docRef = await addDoc(
      collection(db, "webSearches"),
      searchDataToSave
    );
    console.log("Web search results saved to Firebase with ID:", docRef.id);

    // Return processed results or a summary
    return {
      summary: `Found ${searchSnippets.length} relevant results for "${query}".`,
      snippets: searchSnippets,
    };
  } catch (error) {
    console.error("Error during web search or saving to Firebase:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

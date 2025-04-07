// File: src/app/api/weather/route.js
// API route handler for fetching weather data using Next.js App Router

import { NextResponse } from "next/server";

export async function GET(request) {
  // Extract city from query parameters, default to New Delhi if not provided
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "New Delhi";

  // IMPORTANT: Store your API key in environment variables, not directly in the code.
  // Example: process.env.OPENWEATHERMAP_API_KEY
  const apiKey =
    process.env.OPENWEATHERMAP_API_KEY || "bd5e378503939ddaee76f12ad7a97608"; // Replace with your actual key or env variable
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      // Forward the status and message from the OpenWeatherMap API
      return NextResponse.json(
        { message: data.message || "Failed to fetch weather data" },
        { status: response.status }
      );
    }

    // Extract relevant data
    const result = {
      city: data.name,
      temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      description: data.weather[0].main,
      icon: data.weather[0].icon,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

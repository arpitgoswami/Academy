import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  const apiKey =
    process.env.OPENWEATHERMAP_API_KEY || "bd5e378503939ddaee76f12ad7a97608";

  let apiUrl;
  if (lat && lon) {
    // If coordinates are provided, use them
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  } else if (city) {
    // If city name is provided, use it
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  } else {
    // Default to New Delhi
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=New Delhi&appid=${apiKey}`;
  }

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

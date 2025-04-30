const WEATHER_STORAGE_KEY = "weather_data";
const WEATHER_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

const getStoredWeatherData = () => {
  const stored = localStorage.getItem(WEATHER_STORAGE_KEY);
  if (!stored) return null;

  const { data, timestamp } = JSON.parse(stored);
  const isExpired = Date.now() - timestamp > WEATHER_CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(WEATHER_STORAGE_KEY);
    return null;
  }

  return data;
};

const storeWeatherData = (data) => {
  const weatherData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(weatherData));
};

export const fetchWeather = async (params = {}) => {
  // Generate a cache key based on params
  const cacheKey = JSON.stringify(params);

  try {
    // Check local storage first
    const storedData = getStoredWeatherData();
    if (storedData && storedData.cacheKey === cacheKey) {
      console.log("Using cached weather data");
      return storedData;
    }

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/weather?${queryString}`);
    if (!response.ok) {
      throw new Error("Weather API request failed");
    }
    const data = await response.json();

    // Store the data with its cache key
    storeWeatherData({ ...data, cacheKey });
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const getCurrentLocationWeather = () => {
  return new Promise((resolve, reject) => {
    // Check local storage first
    const storedData = getStoredWeatherData();
    if (storedData) {
      console.log("Using cached location weather data");
      return resolve(storedData);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const weather = await fetchWeather({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
            resolve(weather);
          } catch (error) {
            console.log("Weather fetch error:", error);
            const defaultWeather = await fetchWeather(); // Fallback to default location
            resolve(defaultWeather);
          }
        },
        async (error) => {
          console.log("Geolocation error:", error);
          const defaultWeather = await fetchWeather(); // Fallback to default location
          resolve(defaultWeather);
        }
      );
    } else {
      fetchWeather() // Fallback to default location
        .then(resolve)
        .catch(reject);
    }
  });
};

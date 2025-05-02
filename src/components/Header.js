"use client";

import { HiMenu } from "react-icons/hi";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiDust,
} from "react-icons/wi";
import { useState, useEffect } from "react";
import { getCurrentLocationWeather } from "../services/weatherService";

const weatherIcons = {
  Clear: WiDaySunny,
  Clouds: WiCloudy,
  Rain: WiRain,
  Snow: WiSnow,
  Thunderstorm: WiThunderstorm,
  default: WiDust,
};

export default function Header({ onMenuClick }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getCurrentLocationWeather();
        setWeather(data);
      } catch (error) {
        console.error("Error loading weather:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  const WeatherIcon = weather
    ? weatherIcons[weather.description] || weatherIcons.default
    : weatherIcons.default;

  return (
    <header className="sticky top-0 z-10 flex md:hidden items-center justify-between px-4 h-20 bg-white/95 backdrop-blur-md dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800/50 shadow-sm">
      {/* Left section - Logo and Brand */}
      <div className="flex items-center">
        <div className="flex items-center group cursor-pointer">
          <div className="w-10 h-10 mr-2.5 transition-transform group-hover:scale-105">
            <img src="/logo_no_text.svg" alt="Logo" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Academy
            </h1>
          </div>
        </div>
      </div>

      {/* Right section - Weather and Menu */}
      <div className="flex items-center gap-6">
        {weather && (
          <div className="flex items-center gap-2 text-sm">
            <WeatherIcon className="w-5 h-5 text-teal-500" />
            <span className="text-gray-600">{Math.round(weather.temp)}°C</span>
          </div>
        )}

        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          aria-label="Open menu"
        >
          <HiMenu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

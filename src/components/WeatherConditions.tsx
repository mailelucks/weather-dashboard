import type { WeatherData } from '@/types';
import { convertUnixToImperialTime } from '@/lib/convertUnixToImperialTime';
import {
  ThermometerSun,
  ThermometerSnowflake,
  Wind,
  Sun,
  Sunset,
  Flame,
  FlameKindling,
} from 'lucide-react';

const WeatherConditions = (weather: WeatherData) => {
  return (
    <>
      <p className="text-5xl flex items-center gap-2 mb-8">
        <ThermometerSun className="text-yellow-500" size={50} />
        {weather.temp}°F
      </p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {weather.temp < 65 && weather.temp > 50 && (
          <li className="text-lg flex items-center gap-2">
            <FlameKindling className="text-gray-500" size={20} />
            Sweater Weather
          </li>
        )}
        {weather.temp > 90 && (
          <li className="text-lg flex items-center gap-2">
            <Flame className="text-red-500" size={20} />
            Scorching Hot! Stay Hydrated
          </li>
        )}
        {weather.windSpeed > 15 && (
          <li className="text-lg flex items-center gap-2">
            <Wind className="text-gray-400" size={20} />
            Windy! Hold Onto Your Hat
          </li>
        )}
        {weather.temp < 32 && (
          <li className="text-lg flex items-center gap-2">
            <ThermometerSnowflake className="text-blue-500" size={20} />
            Freezing Cold – Stay Warm!
          </li>
        )}
        <li className="text-lg flex items-center gap-2">
          <Sun className="text-orange-500" size={20} />
          Sunrise at {convertUnixToImperialTime(weather.sunrise)}
        </li>
        <li className="text-lg flex items-center gap-2">
          <Sunset className="text-orange-500" size={20} />
          Sunset at {convertUnixToImperialTime(weather.sunset)}
        </li>
      </ul>
    </>
  );
};

export default WeatherConditions;

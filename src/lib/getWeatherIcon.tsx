import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  CloudSnow,
  CloudSun,
  Moon,
  CloudMoon,
  CloudSunRain,
} from 'lucide-react';
import { type JSX } from 'react';

export const getWeatherIcon = (iconCode: string) => {
  const iconMap: Record<string, JSX.Element> = {
    '01d': <Sun size={48} className="text-yellow-500" />, // Clear Sky (Day)
    '01n': <Moon size={48} className="text-gray-400" />, // Clear Sky (Night)
    '02d': <CloudSun size={48} className="text-gray-500" />, // Few Clouds (Day)
    '02n': <CloudMoon size={48} className="text-gray-400" />, // Few Clouds (Night)
    '03d': <Cloud size={48} className="text-gray-500" />, // Scattered Clouds
    '03n': <Cloud size={48} className="text-gray-500" />, // Scattered Clouds
    '04d': <Cloud size={48} className="text-gray-600" />, // Broken Clouds
    '04n': <Cloud size={48} className="text-gray-600" />, // Broken Clouds
    '09d': <CloudDrizzle size={48} className="text-blue-500" />, // Drizzle
    '09n': <CloudDrizzle size={48} className="text-blue-500" />, // Drizzle
    '10d': <CloudSunRain size={48} className="text-blue-500" />, // Rain (Day)
    '10n': <CloudRain size={48} className="text-blue-500" />, // Rain (Night)
    '11d': <CloudLightning size={48} className="text-yellow-400" />, // Thunderstorm
    '11n': <CloudLightning size={48} className="text-yellow-400" />, // Thunderstorm
    '13d': <CloudSnow size={48} className="text-blue-300" />, // Snow
    '13n': <CloudSnow size={48} className="text-blue-300" />, // Snow
    '50d': <CloudFog size={48} className="text-gray-400" />, // Mist / Fog
    '50n': <CloudFog size={48} className="text-gray-400" />, // Mist / Fog
  };

  return iconMap[iconCode] || <Cloud size={48} className="text-gray-500" />; // Default Icon
};

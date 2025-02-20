'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeatherStore } from '@/store/useWeatherStore';
import { type WeatherData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface WeatherCardProps {
  city: string;
  isCompareMode?: boolean;
}

const WeatherCard = ({ city, isCompareMode = false }: WeatherCardProps) => {
  const { weatherData, removeCity } = useWeatherStore();
  const pathname = usePathname();
  const isCurrentCity = pathname === `/weather/${city}`;
  const data: WeatherData | undefined = weatherData[city];

  if (!data) {
    return <div className="w-full h-32 bg-gray-200 animate-pulse rounded-md" />;
  }

  return (
    <>
      {!isCurrentCity ? (
        <Link
          href={`/weather/${city}`}
          className="block p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white group">
          <CardHeader>
            <CardTitle>
              {data.city}, {data.country}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>Temperature: {data.temp}°C</p>
            <p className="text-blue-500 group-hover:underline">Learn More</p>
          </CardContent>
        </Link>
      ) : (
        <Card className="p-4">
          <CardHeader>
            <CardTitle>{data.city}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Temperature: {data.temp}°C</p>
            <p>Humidity: {data.humidity}%</p>
            <p>Wind Speed: {data.windSpeed} m/s</p>
            <p>Conditions: {data.conditions}</p>
          </CardContent>
        </Card>
      )}
      {isCompareMode && (
        <button
          onClick={() => removeCity(city)}
          className="text-red-500 mt-2 w-full">
          Remove from Comparison
        </button>
      )}
    </>
  );
};

export default WeatherCard;

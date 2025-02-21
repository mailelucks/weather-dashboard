'use client';

import Link from 'next/link';
import { useWeatherSearchStore } from '@/store/useWeatherSearchStore';
import { type WeatherData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { getWeatherIcon } from '@/lib/getWeatherIcon';

interface RecentSearchCardProps {
  city: string;
}

const RecentSearchCard = ({ city }: RecentSearchCardProps) => {
  const { weatherData } = useWeatherSearchStore();
  const data: WeatherData | undefined = weatherData[city];

  if (!data) {
    return <div className="w-full h-32 bg-gray-200 animate-pulse rounded-md" />;
  }

  return (
    <Link href={`/weather/${city}`} className="block group">
      <Card className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-l">
            {data.city}, {data.country}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {getWeatherIcon(data.icon)}
          <p className="text-3xl bold">{data.temp}°F</p>
          <p className="text-blue-500 group-hover:underline">Learn More</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentSearchCard;

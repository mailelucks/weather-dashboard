'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeatherStore } from '@/store/useWeatherStore';
import { WeatherCard } from '@/components';

const WeatherList = () => {
  const { recentSearches, selectedCities } = useWeatherStore();
  const pathname = usePathname();

  const isComparePage = pathname === '/weather/compare';
  const currentCity = pathname.split('/').pop();
  const citiesToShow = isComparePage ? selectedCities : recentSearches;
  const filteredCities = citiesToShow.filter((city) => city !== currentCity);

  return (
    <div>
      {filteredCities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCities.map((city) => (
            <WeatherCard key={city} city={city} isCompareMode={isComparePage} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          {isComparePage ? (
            'No cities selected for comparison.'
          ) : (
            <>
              Search for a city to see its weather.{' '}
              <Link href="/weather" className="text-blue-500 hover:underline">
                Go home
              </Link>
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default WeatherList;

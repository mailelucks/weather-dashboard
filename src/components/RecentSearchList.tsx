'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeatherSearchStore } from '@/store/useWeatherSearchStore';
import { RecentSearchCard } from '@/components';

const RecentSearchList = () => {
  const { recentSearches } = useWeatherSearchStore();
  const pathname = usePathname();

  const currentCity = pathname.split('/').pop();
  const filteredCities = recentSearches.filter((city) => city !== currentCity);

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
      {filteredCities.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCities.map((city) => (
            <li key={city}>
              <RecentSearchCard key={city} city={city} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Search for a city to see its weather.{' '}
          {pathname !== '/' && (
            <Link href="/weather" className="text-blue-500 hover:underline">
              Go home
            </Link>
          )}
        </p>
      )}
    </section>
  );
};

export default RecentSearchList;

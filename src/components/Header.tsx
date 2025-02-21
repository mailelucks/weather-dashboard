'use client';
import Link from 'next/link';
import { Clock, Menu, X } from 'lucide-react';
import { useWeatherSearchStore } from '@/store/useWeatherSearchStore';
import DarkModeToggle from '@/components/DarkModeToggle';

const Header = () => {
  const { recentSearches } = useWeatherSearchStore();

  return (
    <header className="p-5 bg-primary">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white hover:underline">
          <h1 className="text-xl font-bold">Weather Dashboard</h1>
        </Link>

        <nav className="hidden text-white  md:flex gap-10">
          <Link href="/weather/compare" className="hover:underline">
            Multi-City 24-Hour Temperature Comparison
          </Link>
        </nav>

        <DarkModeToggle />

        <details className="md:hidden relative group">
          <summary className="list-none p-2 rounded-md cursor-pointer focus:outline-none flex items-center">
            <span className="group-open:hidden">
              <Menu size={24} />
            </span>
            <span className="hidden group-open:inline">
              <X size={24} />
            </span>
          </summary>
          <nav className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg flex flex-col items-center gap-2 py-3">
            <Link
              href="/weather/compare"
              className="hover:underline w-full text-center py-2">
              Multi-City Comparer
            </Link>
            {recentSearches.length > 0 && (
              <div className="w-full text-center mt-3 border-t pt-2">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Clock size={16} /> Recent Searches
                </p>
                <ul className="mt-1">
                  {recentSearches.map((city) => (
                    <li key={city}>
                      <Link
                        href={`/weather/${city}`}
                        className="block w-full text-center py-1 hover:underline">
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </details>
      </div>
    </header>
  );
};

export default Header;

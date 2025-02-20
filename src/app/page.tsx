'use client';
import { SearchBar, WeatherList } from '@/components';

const WeatherHomePage = () => {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Search for a City</h1>
        <SearchBar mode="default" />
        <h2 className="text-xl font-semibold">Recent Searches</h2>
        <WeatherList />
      </div>
    </section>
  );
};

export default WeatherHomePage;

'use client';
import { SearchBar } from '@/components';

const WeatherHomePage = () => {
  return (
    <section className="container mx-auto py-4">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Search for a City</h1>
        <SearchBar mode="default" />
      </div>
    </section>
  );
};

export default WeatherHomePage;

'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useWeather } from '@/hooks/useWeather';
import { useWeatherStore } from '@/store/useWeatherStore';
import { WeatherCard, WeatherList } from '@/components';
import TemperatureLineChart from '@/components/TemperatureLineChart';

const WeatherPage = () => {
  const { city } = useParams();
  const { weatherData, storeWeatherData } = useWeatherStore();

  if (!city || typeof city !== 'string') return <p>Loading...</p>;

  const decodedCity = decodeURIComponent(city);
  const formattedCity = decodedCity.replace(/\s+/g, ' ');

  const { data, isLoading } = useWeather(formattedCity);

  useEffect(() => {
    if (data && !weatherData[formattedCity]) {
      storeWeatherData(formattedCity, data);
    }
  }, [data, formattedCity, storeWeatherData, weatherData]);

  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Weather for {formattedCity.toUpperCase()}
        </h1>
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <p>Loading weather data...</p>
          ) : (
            <>
              <WeatherCard city={formattedCity} />
              <TemperatureLineChart city={formattedCity} />
            </>
          )}
        </div>
      </section>

      <section className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mt-6">Recent Searches</h2>
        <WeatherList />
      </section>
    </>
  );
};

export default WeatherPage;

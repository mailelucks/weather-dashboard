'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useWeatherSearchStore } from '@/store/useWeatherSearchStore';
import CompareCityTempLineChart from '@/components/CompareCityTempLineChart';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui';
import { fetchWeatherForecast } from '@/lib/fetchWeatherForecast';

const CompareWeatherPage = () => {
  const {
    selectedCities,
    removeCityFromCompare,
    forecastData,
    storeForecastData,
  } = useWeatherSearchStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchForecasts = async () => {
      setLoading(true);

      await Promise.all(
        selectedCities.map(async (city) => {
          if (!forecastData[city]) {
            const forecast = await fetchWeatherForecast(city);
            if (forecast) storeForecastData(city, forecast);
          }
        })
      );

      setLoading(false);
    };

    if (selectedCities.length > 0) {
      fetchForecasts();
    }
  }, [selectedCities, forecastData, storeForecastData]);

  const filteredForecastData = selectedCities
    .slice(0, 3)
    .map((city) => ({
      city,
      data: forecastData[city] || null,
    }))
    .filter((entry) => entry.data !== null);

  return (
    <section className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Compare Cities</h1>
      <SearchBar mode="compare" />
      <CompareCityTempLineChart
        forecastData={filteredForecastData}
        loading={loading}
      />
      {selectedCities.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Cities</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCities.map((city) => (
              <Button
                key={city}
                onClick={() => removeCityFromCompare(city)}
                variant="outline">
                {city}{' '}
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </Button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CompareWeatherPage;

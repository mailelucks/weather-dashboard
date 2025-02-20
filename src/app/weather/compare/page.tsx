'use client';
import { SearchBar, WeatherList } from '@/components';
import { Button } from '@/components/ui';
import { useWeatherStore } from '@/store/useWeatherStore';

const CompareWeatherPage = () => {
  const { selectedCities, removeCity } = useWeatherStore();

  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-4">Compare Cities</h1>
        <SearchBar mode="compare" />
        <div className="mt-4">
          {selectedCities.length > 0 ? (
            <div>
              <WeatherList />
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCities.map((city) => (
                  <Button
                    key={city}
                    variant="destructive"
                    onClick={() => removeCity(city)}>
                    Remove {city}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No cities selected for comparison.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompareWeatherPage;

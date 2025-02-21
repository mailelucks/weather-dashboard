'use client';

import { useParams } from 'next/navigation';
import { useForecast, useWeather } from '@/hooks';
import { BarChartVariant } from '@/types/weather';
import {
  TemperatureLineChart,
  WeatherConditionsPieChart,
  WeatherBarChart,
  WeatherCard,
  WeatherConditions,
} from '@/components';

const WeatherPage = () => {
  const { city } = useParams();

  if (!city || typeof city !== 'string') return <p>Loading...</p>;

  const decodedCity = decodeURIComponent(city);
  const formattedCity = decodedCity.replace(/\s+/g, ' ');

  const { data: weather, isLoading: isWeatherLoading } =
    useWeather(formattedCity);

  const { data: forecast, isLoading: isForecastLoading } =
    useForecast(formattedCity);

  if (isWeatherLoading || isForecastLoading)
    return <p>Loading weather data...</p>;

  if (!weather) return <p>City not found.</p>;

  return (
    <section className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">
        Weather for {formattedCity.toUpperCase()}, {weather.country}
      </h2>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
          <WeatherCard
            title="Current Conditions"
            content={<WeatherConditions {...weather} />}
          />
        </div>

        {forecast && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <WeatherCard
              title="12-Hour Temperature Forecast"
              content={<TemperatureLineChart forecastData={forecast} />}
            />
            <WeatherCard
              title="5-Day Weather Conditions Breakdown"
              content={<WeatherConditionsPieChart forecastData={forecast} />}
            />
            <WeatherCard
              title={BarChartVariant.WindSpeed}
              content={
                <WeatherBarChart
                  forecastData={forecast}
                  variant={BarChartVariant.WindSpeed}
                  color={'var(--color-sky-600)'}
                />
              }
            />
            <WeatherCard
              title={BarChartVariant.Humidity}
              content={
                <WeatherBarChart
                  forecastData={forecast}
                  variant={BarChartVariant.Humidity}
                  color={'var(--color-rose-600)'}
                />
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default WeatherPage;

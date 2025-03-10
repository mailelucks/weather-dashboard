import { type ForecastData, type OpenWeatherForecastResponse } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherForecast = async (
  city: string
): Promise<ForecastData[] | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=imperial`
    );
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }

    const data: OpenWeatherForecastResponse = await response.json();
    return data.list.map((entry) => {
      const condition = entry.weather.find((w) => w.description) || {
        description: 'Unknown',
      };

      return {
        city,
        conditions: condition.description,
        humidity: entry.main.humidity,
        temp: entry.main.temp,
        time: entry.dt_txt,
        windSpeed: entry.wind.speed,
      };
    });
  } catch (error) {
    console.error('Forecast fetch error:', error);
    return null;
  }
};

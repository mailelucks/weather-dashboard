import { type OpenWeatherResponse, type WeatherData } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('City not found or API error');
    }

    const data: OpenWeatherResponse = await response.json();
    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      conditions: data.weather[0].description,
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return null;
  }
};

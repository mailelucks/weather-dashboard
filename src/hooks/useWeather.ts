import { useQuery } from '@tanstack/react-query';
import { fetchWeatherByCity } from '@/lib/fetchWeather';
import { useWeatherStore } from '@/store/useWeatherStore';
import { type WeatherData } from '@/types';

export const useWeather = (city: string) => {
  const { weatherData, storeWeatherData } = useWeatherStore();

  return useQuery<WeatherData | null>({
    queryKey: ['weather', city],
    queryFn: async () => {
      if (weatherData[city]) return weatherData[city];
      const data = await fetchWeatherByCity(city);
      if (data) storeWeatherData(city, data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

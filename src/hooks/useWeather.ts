import { useQuery } from '@tanstack/react-query';
import { fetchWeatherByCity } from '@/lib/fetchWeather';
import { useWeatherSearchStore } from '@/store/useWeatherSearchStore';
import { type WeatherData } from '@/types';

const useWeather = (city: string) => {
  const { weatherData, storeWeatherData } = useWeatherSearchStore();

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

export default useWeather;

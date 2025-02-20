import { useQuery } from '@tanstack/react-query';
import { fetchWeatherForecast } from '@/lib/fetchWeatherForecast';
import { type ForecastData } from '@/types';

export const useForecast = (city: string) => {
  return useQuery<ForecastData[] | null, Error>({
    queryKey: ['forecast', city],
    queryFn: () => fetchWeatherForecast(city),
    staleTime: 1000 * 60 * 5,
  });
};

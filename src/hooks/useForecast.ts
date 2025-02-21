import { useQuery } from '@tanstack/react-query';
import { fetchWeatherForecast } from '@/lib/fetchWeatherForecast';
import { useWeatherSearchStore } from '@/store/useWeatherSearchStore';
import { type ForecastData } from '@/types';

const useForecast = (city: string) => {
  const { forecastData, storeForecastData } = useWeatherSearchStore();

  return useQuery<ForecastData[] | null>({
    queryKey: ['forecast', city],
    queryFn: async () => {
      if (forecastData[city]) return forecastData[city];
      const data = await fetchWeatherForecast(city);
      if (data) storeForecastData(city, data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useForecast;

import type { ForecastData, WeatherData } from './weather';

export type WeatherSearchStore = {
  recentSearches: string[];
  selectedCities: string[];
  weatherData: Record<string, WeatherData>;
  forecastData: Record<string, ForecastData[]>;

  addSearch: (city: string) => void;
  addCityToCompare: (city: string) => void;
  removeCityFromCompare: (city: string) => void;
  storeWeatherData: (city: string, data: WeatherData) => void;
  storeForecastData: (city: string, data: ForecastData[]) => void;
};

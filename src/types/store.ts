import type { WeatherData } from './weather';

export type WeatherStore = {
  recentSearches: string[];
  selectedCities: string[];
  weatherData: Record<string, WeatherData>;

  addCity: (city: string) => void;
  removeCity: (city: string) => void;
  addSearch: (city: string) => void;
  storeWeatherData: (city: string, data: WeatherData) => void;
};

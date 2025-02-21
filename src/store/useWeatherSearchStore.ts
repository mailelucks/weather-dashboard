import { create } from 'zustand';
import {
  type WeatherSearchStore,
  type WeatherData,
  type ForecastData,
} from '@/types';

export const useWeatherSearchStore = create<WeatherSearchStore>((set) => ({
  recentSearches: [],
  selectedCities: [],
  weatherData: {},
  forecastData: {},

  addSearch: (city) =>
    set((state) => {
      const updatedSearches = [
        city,
        ...state.recentSearches.filter((c) => c !== city),
      ];
      return { recentSearches: updatedSearches.slice(0, 15) };
    }),

  addCityToCompare: (city) =>
    set((state) => {
      if (
        state.selectedCities.includes(city) ||
        state.selectedCities.length >= 3
      )
        return state;
      return { selectedCities: [...state.selectedCities, city] };
    }),

  removeCityFromCompare: (city) =>
    set((state) => ({
      selectedCities: state.selectedCities.filter((c) => c !== city),
    })),

  storeWeatherData: (city, data: WeatherData) =>
    set((state) => ({
      weatherData: { ...state.weatherData, [city]: data },
    })),

  storeForecastData: (city, data: ForecastData[]) =>
    set((state) => ({
      forecastData: { ...state.forecastData, [city]: data },
    })),
}));

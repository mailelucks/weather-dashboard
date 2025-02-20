import { create } from 'zustand';
import { type WeatherStore, type WeatherData } from '@/types';

export const useWeatherStore = create<WeatherStore>((set) => ({
  recentSearches: [],
  selectedCities: [],
  weatherData: {},

  addCity: (city) =>
    set((state) => {
      if (
        state.selectedCities.includes(city) ||
        state.selectedCities.length >= 3
      )
        return state;
      return { selectedCities: [...state.selectedCities, city] };
    }),

  removeCity: (city) =>
    set((state) => ({
      selectedCities: state.selectedCities.filter((c) => c !== city),
    })),

  addSearch: (city) =>
    set((state) => {
      const updatedSearches = [
        city,
        ...state.recentSearches.filter((c) => c !== city),
      ];
      return { recentSearches: updatedSearches.slice(0, 5) };
    }),

  storeWeatherData: (city, data: WeatherData) =>
    set((state) => ({
      weatherData: { ...state.weatherData, [city]: data },
    })),
}));

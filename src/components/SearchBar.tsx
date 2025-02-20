'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWeatherStore } from '@/store/useWeatherStore';
import { fetchWeatherByCity } from '@/lib/fetchWeather';
import { Button, Input } from '@/components/ui/';

const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'City name cannot be empty')
    .max(50, 'City name too long'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchBarProps {
  mode?: 'default' | 'compare';
}

const SearchBar = ({ mode = 'default' }: SearchBarProps) => {
  const { addSearch, addCity, storeWeatherData, selectedCities } =
    useWeatherStore();
  const isComparePage = mode === 'compare';
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: SearchFormData) => {
    setError('');

    const weatherData = await fetchWeatherByCity(data.query);
    if (!weatherData) {
      setError('Invalid city. Please try again.');
      return;
    }

    storeWeatherData(data.query, weatherData);

    if (isComparePage) {
      if (selectedCities.includes(data.query) || selectedCities.length >= 3)
        return;
      addCity(data.query);
    } else {
      addSearch(data.query);
    }
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-2 justify-start align-center">
        <Input
          {...register('query')}
          className="w-full md:w-auto md:min-w-sm"
          placeholder="Enter city name"
        />
        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={
            isSubmitting || (isComparePage && selectedCities.length >= 3)
          }>
          Search
        </Button>
      </form>
      {errors.query && (
        <p className="text-red-500 text-sm mt-2">{errors.query.message}</p>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default SearchBar;

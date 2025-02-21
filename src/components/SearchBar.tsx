'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWeatherSearchStore } from '@/store/useWeatherSearchStore';
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
  const { addSearch, addCityToCompare, storeWeatherData, selectedCities } =
    useWeatherSearchStore();
  const isComparePage = mode === 'compare';

  const formMethods = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = formMethods;

  const onSubmit = async (data: SearchFormData) => {
    clearErrors();

    try {
      const weatherData = await fetchWeatherByCity(data.query);
      if (!weatherData) {
        throw new Error('City not found');
      }
      storeWeatherData(data.query, weatherData);
      addSearch(data.query);

      if (isComparePage) {
        if (selectedCities.includes(data.query) || selectedCities.length >= 3)
          return;
        addCityToCompare(data.query);
      }

      reset();
    } catch (error) {
      setError('query', {
        type: 'manual',
        message: 'Invalid city. Please try again.',
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <section>
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
        <div className="text-sm mt-2 min-h-10">
          {errors.query && (
            <p className="text-red-500 ">{errors.query.message}</p>
          )}
          {isComparePage && selectedCities.length >= 3 && (
            <p>Remove a selected city to search for more.</p>
          )}
        </div>
      </section>
    </FormProvider>
  );
};

export default SearchBar;

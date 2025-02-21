'use client';

import dayjs from 'dayjs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { type ForecastData } from '@/types';

const COLORS = [
  'var(--color-red-600)',
  'var(--color-purple-600)',
  'var(--color-green-600)',
];

interface CompareCityTempLineChartProps {
  forecastData: { city: string; data: any }[];
  loading: boolean;
}

const CompareCityTempLineChart = ({
  forecastData,
  loading,
}: CompareCityTempLineChartProps) => {
  if (forecastData.length === 0)
    return <p>Select up to three cities for comparison.</p>;

  const firstValidCity = forecastData.find(({ data }) => data);
  if (!firstValidCity)
    return <p className="w-full">No valid forecast data available.</p>;

  const chartData =
    firstValidCity.data
      ?.slice(0, 8)
      .map((entry: ForecastData, index: number) => {
        const time = dayjs(entry.time).format('HH:mm');

        return {
          time,
          ...forecastData.reduce(
            (acc: Record<string, number | null>, { city, data }) => {
              acc[city] = data?.[index]?.temp ?? null;
              return acc;
            },
            {}
          ),
        };
      }) ?? [];

  return (
    <div className="w-full">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2">
            Temperature Comparison (3 Cities)
          </h3>
          {forecastData.length === 0 && (
            <p>No cities selected for comparison.</p>
          )}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis
                label={{
                  value: '°F',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 5,
                }}
              />
              <Tooltip />
              <Legend />
              {forecastData.map(({ city, data }, index) =>
                data ? (
                  <Line
                    key={city}
                    type="monotone"
                    dataKey={city}
                    stroke={COLORS[index]}
                    strokeWidth={2}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default CompareCityTempLineChart;

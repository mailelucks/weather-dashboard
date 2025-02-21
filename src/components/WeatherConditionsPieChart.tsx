'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { ForecastData } from '@/types';

interface WeatherPieChartProps {
  forecastData: ForecastData[];
}

const COLORS = [
  'var(--color-fuchsia-600)',
  'var(--color-blue-600)',
  'var(--color-rose-600)',
  'var(--color-amber-600)',
  'var(--color-teal-600)',
];

const WeatherPieChart = ({ forecastData }: WeatherPieChartProps) => {
  if (!forecastData) return <p>No forecast data available.</p>;

  const weatherCounts = forecastData.reduce(
    (acc, entry) => {
      const condition = entry.conditions.toLowerCase();
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieData = Object.keys(weatherCounts).map((condition) => ({
    name: condition.charAt(0).toUpperCase() + condition.slice(1),
    value: (weatherCounts[condition] / forecastData.length) * 100,
  }));

  return (
    <div className="w-full h-64 flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}>
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherPieChart;

'use client';

import dayjs from 'dayjs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { ForecastData, BarChartVariant } from '@/types';

interface WeatherBarChartProps {
  forecastData: ForecastData[];
  variant: BarChartVariant;
  color: string;
}

const WeatherBarChart = ({
  forecastData,
  variant,
  color,
}: WeatherBarChartProps) => {
  if (!forecastData) return <p>No forecast data available.</p>;

  const hourlyData = forecastData.slice(0, 5).map((entry) => ({
    time: dayjs(entry.time).format('h:mm A'),
    variant: entry[variant],
  }));

  const yAxisLabel =
    {
      humidity: 'Humidity (%)',
      windSpeed: 'Wind Speed (m/s)',
    }[variant] || 'Value';

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={hourlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            orientation="left"
            domain={[0, 20]}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip formatter={(value) => [`${value}`, yAxisLabel]} />
          <Bar dataKey='variant' fill={color} name={yAxisLabel} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherBarChart;

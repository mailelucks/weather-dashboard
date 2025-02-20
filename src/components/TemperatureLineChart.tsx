'use client';

import { useState } from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useForecast } from '@/hooks/useForecast';
import dayjs from 'dayjs';

interface TemperatureLineChartProps {
  city: string;
}

const TemperatureLineChart = ({ city }: TemperatureLineChartProps) => {
  const { data: forecastData, isLoading } = useForecast(city);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  if (isLoading) return <p>Loading forecast data...</p>;
  if (!forecastData) return <p>No forecast data available.</p>;

  const convertTemp = (temp: number) =>
    unit === 'C' ? temp : (temp * 9) / 5 + 32;

  const hourlyData = forecastData.slice(0, 8).map((entry) => ({
    time: dayjs(entry.time).format('HH:mm'),
    temp: convertTemp(entry.temp),
  }));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Hourly Temperature Forecast</h3>
        <button
          className="px-4 py-1 border rounded-md text-sm"
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
          Switch to {unit === 'C' ? '°F' : '°C'}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={hourlyData}
          margin={{
            top: 20,
            right: 10,
            bottom: 20,
            left: 10,
          }}>
          <XAxis dataKey="time" />
          <YAxis
            domain={['dataMin - 2', 'dataMax + 2']}
            tickFormatter={(value) => value.toFixed(1)}
            label={{
              value: unit === 'C' ? '°Celsius' : '°Farenheit',
              angle: -90,
              position: 'insideLeft',
              offset: 0,
            }}
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="var(--color-purple-800)"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureLineChart;

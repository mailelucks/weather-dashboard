'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { type ForecastData } from '@/types';

interface TemperatureLineChartProps {
  forecastData: ForecastData[];
}

const TemperatureLineChart = ({ forecastData }: TemperatureLineChartProps) => {
  if (!forecastData) return <p>No forecast data available.</p>;

  const [unit, setUnit] = useState<'C' | 'F'>('F');
  const convertTemp = (temp: number) =>
    unit === 'F' ? temp : (temp * 9) / 5 + 32;

  const hourlyData = forecastData.slice(0, 5).map((entry) => ({
    time: dayjs(entry.time).format('h:mm A'),
    temp: convertTemp(entry.temp),
  }));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-4 py-1 border rounded-md text-sm"
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
          Switch to {unit === 'C' ? '°F' : '°C'}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={hourlyData}
          margin={{
            left: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 20, right: 20 }} />
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
            stroke="var(--color-purple-600)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureLineChart;

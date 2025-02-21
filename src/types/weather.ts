export type WeatherData = {
  city: string;
  conditions: string;
  country: string;
  sunrise: number;
  sunset: number;
  icon: string;
  humidity: number;
  temp: number;
  windSpeed: number;
};

export type ForecastData = {
  city: string;
  conditions: string;
  humidity: number;
  temp: number;
  time: string;
  windSpeed: number;
};

export type BarChartVariants = Partial<
  Pick<ForecastData, 'humidity' | 'windSpeed'>
>;

export enum BarChartVariant {
  Humidity = 'humidity',
  WindSpeed = 'windSpeed',
}

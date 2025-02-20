export type WeatherData = {
  city: string;
  country: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
};

export type ForecastData = {
  time: string;
  temp: number;
  humidity: number;
  windSpeed: number;
};

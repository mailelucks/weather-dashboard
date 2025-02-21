export type OpenWeatherResponse = {
  main: { temp: number; humidity: number };
  name: string;
  wind: { speed: number };
  sys: { country: string; sunrise: number; sunset: number };
  weather: {
    description: string;
    icon: string;
  }[];
};

export type OpenWeatherForecastResponse = {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
    }[];
  }[];
};

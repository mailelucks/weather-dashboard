export type OpenWeatherResponse = {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: { description: string }[];
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

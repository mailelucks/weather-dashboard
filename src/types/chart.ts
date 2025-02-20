export type ChartDataset = {
  label: string;
  data: number[];
  borderColor: string;
};

export type ChartData = {
  labels: string[];
  datasets: ChartDataset[];
};

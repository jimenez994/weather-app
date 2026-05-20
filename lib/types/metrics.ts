export interface MetricRange {
  label: string;
  color: string;
  min: number;
  max: number;
}

export interface MetricInfoConfig {
  title: string;
  description: string;
  currentValue: number;
  unit: string;
  ranges: MetricRange[];
  idealLabel?: string;
}
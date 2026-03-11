export type ComputeParams = {
  y_start: number;
  y_end: number;
  y_step: number;
  x_values: number[];
};

export type ComputeResult = {
  x: number;
  y: number;
  result: number;
};

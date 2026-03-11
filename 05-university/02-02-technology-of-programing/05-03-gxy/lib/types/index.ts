export type ComputeParams = {
  x_values: number[];
  y_values: number[];
};

export type ComputeResult = {
  x: number;
  y: number;
  result: number;
};
export type GridData = {
  x_values: number[];
  y_values: number[];
  matrix: number[][];
  functionExpression: string;
  variant: number;
  dataFile: string;
};

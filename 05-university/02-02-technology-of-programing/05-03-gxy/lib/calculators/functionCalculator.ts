import { ComputeParams, ComputeResult } from "../types";

export class FunctionCalculator {
  compute(x: number, y: number): number {
    return y / Math.log10(x);
  }

  computeAll(params: ComputeParams, y_given: number[]): ComputeResult[] {
    const { x_values } = params;
    const results: ComputeResult[] = [];

    for (let i = 0; i < x_values.length; i++) {
      const x = x_values[i];
      const y = y_given[i];
      const result = this.compute(x, y);

      if (!isFinite(result)) {
        throw new Error("Переполнение");
      }

      results.push({ x, y, result });
    }

    return results;
  }
}

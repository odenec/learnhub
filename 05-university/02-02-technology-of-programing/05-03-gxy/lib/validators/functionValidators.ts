import { ComputeParams } from "../types";

export class FunctionValidator {
  validateParams(params: ComputeParams): number[] {
    const { y_start, y_end, y_step, x_values } = params;

    if (y_start > y_end) {
      throw new Error("y_start > y_end");
    }

    if (y_step <= 0) {
      throw new Error("y_step должен быть положительным");
    }

    const y_given: number[] = [];
    for (let val = y_start; val <= y_end + 1e-9; val += y_step) {
      y_given.push(Number(val.toFixed(10)));
    }

    const N = y_given.length;

    if (x_values.length !== N) {
      throw new Error("Количество x не совпадает с количеством y");
    }

    for (const x of x_values) {
      if (x <= 0 || Math.abs(x - 1) < 1e-12) {
        throw new Error("x должен быть > 0 и ≠ 1");
      }
    }

    return y_given;
  }
}

import { ComputeResult } from "../types";

export class TableFormatter {
  formatTable(
    x_values: number[],
    y_values: number[],
    results: ComputeResult[],
    isEvenVariant: boolean,
  ): string {
    const resultMap = new Map();
    results.forEach((r) => {
      resultMap.set(`${r.x},${r.y}`, r.result);
    });

    const lines: string[] = [];

    if (isEvenVariant) {
      const header = ["y\\x", ...x_values.map((x) => x.toFixed(3))].join("\t");
      lines.push(header);

      y_values.forEach((y) => {
        const row = [
          y.toFixed(3),
          ...x_values.map((x) => {
            const result = resultMap.get(`${x},${y}`);
            return result !== undefined ? result.toFixed(6) : "N/A";
          }),
        ];
        lines.push(row.join("\t"));
      });
    } else {
      const header = ["x\\y", ...y_values.map((y) => y.toFixed(3))].join("\t");
      lines.push(header);

      x_values.forEach((x) => {
        const row = [
          x.toFixed(3),
          ...y_values.map((y) => {
            const result = resultMap.get(`${x},${y}`);
            return result !== undefined ? result.toFixed(6) : "N/A";
          }),
        ];
        lines.push(row.join("\t"));
      });
    }

    return lines.join("\n");
  }
}

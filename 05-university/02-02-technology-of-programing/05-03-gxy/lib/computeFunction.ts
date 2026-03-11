// import fs from "fs";
// import path from "path";

// export type ComputeParams = {
//   y_start: number;
//   y_end: number;
//   y_step: number;
//   x_values: number[];
// };

// export type ComputeResult = {
//   x: number;
//   y: number;
//   result: number;
// };

// export class FunctionComputer {
//   private variant: number;
//   private functionExpression: string;
//   private programName: string;
//   private outputDir: string;

//   constructor(variant: number = 16, functionExpression: string = "y / lg(x)") {
//     this.variant = variant;
//     this.functionExpression = functionExpression;
//     this.programName = "G(x,y) Calculator";
//     this.outputDir = path.join(process.cwd(), "output");
//     this.initDirectories();
//   }

//   private initDirectories() {
//     if (!fs.existsSync(this.outputDir)) {
//       fs.mkdirSync(this.outputDir, { recursive: true });
//     }
//   }

//   private validateParams(params: ComputeParams): number[] {
//     const { y_start, y_end, y_step, x_values } = params;

//     if (y_start > y_end) {
//       throw new Error("y_start > y_end");
//     }

//     if (y_step <= 0) {
//       throw new Error("y_step должен быть положительным");
//     }

//     const y_given: number[] = [];
//     for (let val = y_start; val <= y_end + 1e-9; val += y_step) {
//       y_given.push(Number(val.toFixed(10)));
//     }

//     const N = y_given.length;

//     if (x_values.length !== N) {
//       throw new Error("Количество x не совпадает с количеством y");
//     }

//     for (const x of x_values) {
//       if (x <= 0 || Math.abs(x - 1) < 1e-12) {
//         throw new Error("x должен быть > 0 и ≠ 1");
//       }
//     }

//     return y_given;
//   }

//   private compute(x: number, y: number): number {
//     return y / Math.log10(x);
//   }

//   private writeProgramLog(startTime: Date, dataFiles: string[]) {
//     const logPath = path.join(this.outputDir, "myProgram.log");
//     const content = [
//       `Программа: ${this.programName}`,
//       `Вариант: ${this.variant}`,
//       `Дата и время начала: ${startTime.toLocaleString("ru-RU")}`,
//       `Функция: ${this.functionExpression}`,
//       `Файлы результатов:`,
//       ...dataFiles.map((f) => `  ${f}`),
//       "",
//     ].join("\n");

//     fs.writeFileSync(logPath, content);
//   }

//   private writeErrorLog(
//     errors: Array<{ filename: string; x: number; y: number; error: string }>,
//   ) {
//     if (errors.length === 0) return;

//     const logPath = path.join(this.outputDir, "myErrors.log");
//     const content =
//       errors
//         .map((e) =>
//           [
//             `Файл: ${e.filename}`,
//             `Функция: ${this.functionExpression}`,
//             `Аргументы: x=${e.x}, y=${e.y}`,
//             `Ошибка: ${e.error}`,
//             "---",
//           ].join("\n"),
//         )
//         .join("\n\n") + "\n";

//     fs.appendFileSync(logPath, content);
//   }

//   private formatTableForVariant(
//     x_values: number[],
//     y_values: number[],
//     results: ComputeResult[],
//     isEvenVariant: boolean,
//   ): string {
//     const resultMap = new Map();
//     results.forEach((r) => {
//       resultMap.set(`${r.x},${r.y}`, r.result);
//     });

//     const lines: string[] = [];

//     if (isEvenVariant) {
//       const header = ["y\\x", ...x_values.map((x) => x.toFixed(3))].join("\t");
//       lines.push(header);

//       y_values.forEach((y) => {
//         const row = [
//           y.toFixed(3),
//           ...x_values.map((x) => {
//             const result = resultMap.get(`${x},${y}`);
//             return result !== undefined ? result.toFixed(6) : "N/A";
//           }),
//         ];
//         lines.push(row.join("\t"));
//       });
//     } else {
//       const header = ["x\\y", ...y_values.map((y) => y.toFixed(3))].join("\t");
//       lines.push(header);

//       x_values.forEach((x) => {
//         const row = [
//           x.toFixed(3),
//           ...y_values.map((y) => {
//             const result = resultMap.get(`${x},${y}`);
//             return result !== undefined ? result.toFixed(6) : "N/A";
//           }),
//         ];
//         lines.push(row.join("\t"));
//       });
//     }

//     return lines.join("\n");
//   }

//   public computeFunction(
//     params: ComputeParams,
//     dataSetNumber: number = 1,
//   ): {
//     variant: number;
//     functionExpression: string;
//     results: ComputeResult[];
//     dataFile: string;
//   } {
//     const errors: Array<{
//       filename: string;
//       x: number;
//       y: number;
//       error: string;
//     }> = [];
//     const results: ComputeResult[] = [];

//     try {
//       const y_given = this.validateParams(params);
//       const { x_values } = params;

//       for (let i = 0; i < x_values.length; i++) {
//         try {
//           const x = x_values[i];
//           const y = y_given[i];
//           const result = this.compute(x, y);

//           if (!isFinite(result)) {
//             throw new Error("Переполнение");
//           }

//           results.push({ x, y, result });
//         } catch (error) {
//           const filename = this.getDataFilename(dataSetNumber);
//           errors.push({
//             filename,
//             x: x_values[i],
//             y: y_given[i],
//             error:
//               error instanceof Error ? error.message : "Неизвестная ошибка",
//           });
//         }
//       }

//       if (errors.length > 0) {
//         this.writeErrorLog(errors);
//       }

//       const dataFilename = this.getDataFilename(dataSetNumber);
//       const dataFilePath = path.join(this.outputDir, dataFilename);

//       const isEvenVariant = this.variant % 2 === 0;
//       const tableContent = this.formatTableForVariant(
//         params.x_values,
//         y_given,
//         results,
//         isEvenVariant,
//       );

//       const dataContent = [
//         `Функция: ${this.functionExpression}`,
//         `Количество точек: x=${params.x_values.length}, y=${y_given.length}`,
//         "",
//         tableContent,
//         "",
//       ].join("\n");

//       fs.writeFileSync(dataFilePath, dataContent);

//       return {
//         variant: this.variant,
//         functionExpression: this.functionExpression,
//         results,
//         dataFile: dataFilename,
//       };
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Неизвестная ошибка";
//       throw new Error(`Ошибка вычисления: ${errorMessage}`);
//     }
//   }

//   private getDataFilename(number: number): string {
//     return `G${number.toString().padStart(4, "0")}.dat`;
//   }

//   public computeMultiple(paramsArray: ComputeParams[]): Array<{
//     variant: number;
//     functionExpression: string;
//     results: ComputeResult[];
//     dataFile: string;
//   }> {
//     const startTime = new Date();
//     const results = [];
//     const dataFiles: string[] = [];

//     for (let i = 0; i < paramsArray.length; i++) {
//       try {
//         const result = this.computeFunction(paramsArray[i], i + 1);
//         results.push(result);
//         dataFiles.push(result.dataFile);
//       } catch (error) {
//         console.error(`Ошибка при обработке набора ${i + 1}:`, error);
//       }
//     }

//     this.writeProgramLog(startTime, dataFiles);

//     return results;
//   }
// }

// export const defaultComputer = new FunctionComputer(16, "y / lg(x)");

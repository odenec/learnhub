import path from "path";
import { ComputeParams, ComputeResult } from "./types";
import { FunctionValidator } from "./validators/functionValidators";
import { FunctionCalculator } from "./calculators/functionCalculator";
import { TableFormatter } from "./formatters/tableFormatter";
import { FileLogger } from "./loggers/fileLogger";

export class FunctionComputer {
  private variant: number;
  private functionExpression: string;
  private programName: string;
  private validator: FunctionValidator;
  private calculator: FunctionCalculator;
  private formatter: TableFormatter;
  private logger: FileLogger;

  constructor(variant: number = 16, functionExpression: string = "y / lg(x)") {
    this.variant = variant;
    this.functionExpression = functionExpression;
    this.programName = "G(x,y) Calculator";
    this.validator = new FunctionValidator();
    this.calculator = new FunctionCalculator();
    this.formatter = new TableFormatter();
    this.logger = new FileLogger(path.join(process.cwd(), "output"));
  }

  public computeFunction(
    params: ComputeParams,
    dataSetNumber: number = 1,
  ): {
    variant: number;
    functionExpression: string;
    results: ComputeResult[];
    dataFile: string;
  } {
    const errors: Array<{
      filename: string;
      x: number;
      y: number;
      error: string;
    }> = [];
    let results: ComputeResult[] = [];

    try {
      const y_given = this.validator.validateParams(params);

      try {
        results = this.calculator.computeAll(params, y_given);
      } catch (error) {
        const filename = this.logger.getDataFilename(dataSetNumber);
        errors.push({
          filename,
          x: params.x_values[0],
          y: y_given[0],
          error: error instanceof Error ? error.message : "Неизвестная ошибка",
        });
      }

      if (errors.length > 0) {
        this.logger.writeErrorLog(this.functionExpression, errors);
      }

      const dataFilename = this.logger.getDataFilename(dataSetNumber);
      const isEvenVariant = this.variant % 2 === 0;
      const tableContent = this.formatter.formatTable(
        params.x_values,
        y_given,
        results,
        isEvenVariant,
      );

      const dataContent = [
        `Функция: ${this.functionExpression}`,
        `Количество точек: x=${params.x_values.length}, y=${y_given.length}`,
        "",
        tableContent,
        "",
      ].join("\n");

      this.logger.writeDataFile(dataFilename, dataContent);

      return {
        variant: this.variant,
        functionExpression: this.functionExpression,
        results,
        dataFile: dataFilename,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      throw new Error(`Ошибка вычисления: ${errorMessage}`);
    }
  }

  public computeMultiple(paramsArray: ComputeParams[]): Array<{
    variant: number;
    functionExpression: string;
    results: ComputeResult[];
    dataFile: string;
  }> {
    const startTime = new Date();
    const results = [];
    const dataFiles: string[] = [];

    for (let i = 0; i < paramsArray.length; i++) {
      try {
        const result = this.computeFunction(paramsArray[i], i + 1);
        results.push(result);
        dataFiles.push(result.dataFile);
      } catch (error) {
        console.error(`Ошибка при обработке набора ${i + 1}:`, error);
      }
    }

    this.logger.writeProgramLog(
      this.programName,
      this.variant,
      this.functionExpression,
      startTime,
      dataFiles,
    );

    return results;
  }
}

export const defaultComputer = new FunctionComputer(16, "y / lg(x)");

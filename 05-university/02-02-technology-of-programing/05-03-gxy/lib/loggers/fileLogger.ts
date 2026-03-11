import fs from "fs";
import path from "path";

type ErrorData = {
  filename: string;
  x: number;
  y: number;
  error: string;
};

export class FileLogger {
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
    this.initDirectories();
  }

  private initDirectories() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  writeProgramLog(
    programName: string,
    variant: number,
    functionExpression: string,
    startTime: Date,
    dataFiles: string[],
  ) {
    const logPath = path.join(this.outputDir, "myProgram.log");
    const content = [
      `Программа: ${programName}`,
      `Вариант: ${variant}`,
      `Дата и время начала: ${startTime.toLocaleString("ru-RU")}`,
      `Функция: ${functionExpression}`,
      `Файлы результатов:`,
      ...dataFiles.map((f) => `  ${f}`),
      "",
    ].join("\n");

    fs.writeFileSync(logPath, content);
  }

  writeErrorLog(functionExpression: string, errors: ErrorData[]) {
    if (errors.length === 0) return;

    const logPath = path.join(this.outputDir, "myErrors.log");
    const content =
      errors
        .map((e) =>
          [
            `Файл: ${e.filename}`,
            `Функция: ${functionExpression}`,
            `Аргументы: x=${e.x}, y=${e.y}`,
            `Ошибка: ${e.error}`,
            "---",
          ].join("\n"),
        )
        .join("\n\n") + "\n";

    fs.appendFileSync(logPath, content);
  }

  writeDataFile(filename: string, content: string) {
    const filePath = path.join(this.outputDir, filename);
    fs.writeFileSync(filePath, content);
  }

  getDataFilename(number: number): string {
    return `G${number.toString().padStart(4, "0")}.dat`;
  }
}

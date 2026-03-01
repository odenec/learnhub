interface IThermalCalc {
  calculate(temperature: number): number;
  getSubstanceName(): string;
  getExperimentalData(): { temperatures: number[]; values: number[] };
}

abstract class BaseThermalData {
  protected readonly temperatures: number[] = [200, 220, 240, 260, 280, 300];

  getTemperatures(): number[] {
    return [...this.temperatures];
  }
}

class NOCalc extends BaseThermalData implements IThermalCalc {
  private readonly experimentalData: number[] = [
    17.6, 19.3, 21.0, 22.7, 24.3, 25.9,
  ];

  calculate(temperature: number): number {
    return (
      -2.42 +
      0.114 * temperature -
      7.95e-5 * Math.pow(temperature, 2) +
      4.85e-8 * Math.pow(temperature, 3)
    );
  }

  getSubstanceName(): string {
    return "ОКСИД АЗОТА (NO)";
  }

  getExperimentalData(): { temperatures: number[]; values: number[] } {
    return {
      temperatures: this.getTemperatures(),
      values: [...this.experimentalData],
    };
  }
}

class NH3Calc extends BaseThermalData implements IThermalCalc {
  private readonly experimentalData: number[] = [
    13.25, 15.33, 17.5, 19.74, 22.05, 24.44,
  ];

  calculate(temperature: number): number {
    return (
      -2.46 +
      0.0525 * temperature +
      1.43e-4 * Math.pow(temperature, 2) -
      0.635e-7 * Math.pow(temperature, 3)
    );
  }

  getSubstanceName(): string {
    return "АММИАК (NH3)";
  }

  getExperimentalData(): { temperatures: number[]; values: number[] } {
    return {
      temperatures: this.getTemperatures(),
      values: [...this.experimentalData],
    };
  }
}

class ResultFormatter {
  private readonly note: string = "Примечание: значения λ·10³ в Вт/(м·К)";

  formatResults(strategy: IThermalCalc, temperatures: number[]): string {
    const experimentalData = strategy.getExperimentalData();
    let result = `${strategy.getSubstanceName()}\r\n`;
    result += "  T(K) |  Расчёт  | Эксперимент | Разница  |\r\n";

    temperatures.forEach((temp, index) => {
      const calculated = strategy.calculate(temp);
      const experimental = experimentalData.values[index];
      const difference = calculated - experimental;
      const percentDiff = (difference / experimental) * 100;

      result += `  ${temp.toString().padStart(3)} |  ${calculated.toFixed(3).padStart(6)}  |   ${experimental.toFixed(2).padStart(6)}    |  ${difference.toFixed(2).padStart(6)} (${percentDiff.toFixed(1).padStart(5)}%) |\r\n`;
    });

    result += "─────────────────────────────────────────────────\r\n";
    result += this.note;

    return result;
  }
}

export class ProgramInfo {
  private readonly version: string = "Версия 1.0";
  private readonly date: string = "Дата изменения: 17.02.2026";
  private readonly author: string =
    "Автор: Студент группы Папихин Владислав Евгеньевич";
  private readonly purpose: string =
    "Назначение: Расчёт теплопроводности газов";
  private readonly formulas: string = "Формулы для оксида азота и аммиака";
  private readonly temperatureRange: string = "Диапазон температур: 200-300 К";

  getInfo(): string {
    let info = "ИНФОРМАЦИЯ О ПРОГРАММЕ\r\n";
    info += "══════════════════════\r\n";
    info += `${this.version}\r\n`;
    info += `${this.date}\r\n`;
    info += `${this.author}\r\n`;
    info += "══════════════════════\r\n";
    info += `${this.purpose}\r\n`;
    info += `${this.formulas}\r\n`;
    info += this.temperatureRange;

    return info;
  }

  getInfoObject() {
    return {
      title: "ИНФОРМАЦИЯ О ПРОГРАММЕ",
      version: this.version,
      date: this.date,
      author: this.author,
      purpose: this.purpose,
      formulas: this.formulas,
      temperatureRange: this.temperatureRange,
    };
  }
}

class ThermalFactory {
  createStrategy(substance: "NO" | "NH3"): IThermalCalc {
    switch (substance) {
      case "NO":
        return new NOCalc();
      case "NH3":
        return new NH3Calc();
      default:
        throw new Error(`Unknown substance: ${substance}`);
    }
  }
}

class ThermalCalculator {
  private readonly factory: ThermalFactory;
  private readonly formatter: ResultFormatter;

  constructor() {
    this.factory = new ThermalFactory();
    this.formatter = new ResultFormatter();
  }

  calculate(substance: "NO" | "NH3"): string {
    const strategy = this.factory.createStrategy(substance);
    const temperatures = strategy.getExperimentalData().temperatures;

    return this.formatter.formatResults(strategy, temperatures);
  }
}

export const calculateSubstance = (substance: "NO" | "NH3"): string => {
  const calculator = new ThermalCalculator();
  return calculator.calculate(substance);
};
interface IProgramInfo {
  title: string;
  version: string;
  date: string;
  author: string;
  purpose: string;
  formulas: string;
  temperatureRange: string;
}
export const getProgramInfo = (): IProgramInfo => {
  const programInfo = new ProgramInfo();
  return programInfo.getInfoObject();
};

// Пример использования:
// console.log(calculateThermalConductivity('NO'));
// console.log(calculateThermalConductivity('NH3'));
// console.log(getProgramInfo());

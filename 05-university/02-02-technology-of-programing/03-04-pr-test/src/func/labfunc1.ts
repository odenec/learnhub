export class LabFanction {
  private startX: number;
  private endX: number;
  private count: number = 1001;
  private _result: number[] = [];

  constructor(startX: number, endX: number) {
    this.startX = startX;
    this.endX = endX;
  }

  //F1(x) = exp(sin(x))
  private F1(x: number): number {
    return Math.exp(Math.sin(x));
  }

  //F2(x) = log4(x/1-x)
  private F2(x: number): number {
    const arg = x / (1 - x);
    if (1 - x == 0 || arg < 0) {
      throw new Error(`F2 неприемлемое значение при вычислении`);
    }
    try {
      return Math.log(arg) / Math.log(4);
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  //F3(x)=arcsin(sqr(16-x))
  private F3(x: number): number {
    const underRoot = 16 - Math.pow(x, 4);
    if (
      underRoot < 0 ||
      Math.sqrt(underRoot) <= 1 ||
      Math.sqrt(underRoot) >= 1
    ) {
      throw new Error(`F3 неприемлемое значение при вычислении`);
    }
    try {
      return Math.asin(Math.sqrt(underRoot));
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  //F4(x) = sum(1/x+sqr(j)) j от 1 до 100000
  private F4(x: number): number {
    let sum = 0;

    for (let j = 1; j <= 100000; j++) {
      try {
        if (x + Math.sqrt(j) == 0 || j <= 0) {
          throw new Error(`F4 неприемлемое значение при вычислении`);
        }
        sum += 1 / (x + Math.sqrt(j));
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    return sum;
  }

  public calculateRange(): void {
    const step = (this.endX - this.startX) / this.count;
    const totalPoints = this.count + 1;

    this._result = new Array(totalPoints);

    let i = 0;
    do {
      const x = this.startX + i * step;
      const functions = [this.F1, this.F2, this.F3, this.F4];

      const sum = functions.reduce((acc, fn) => {
        try {
          return acc + fn.call(this, x);
        } catch {
          return acc + 0;
        }
      }, 0);

      this._result[i] = sum;
      i++;
    } while (i <= this.count);

    console.log(`Всего результатов: ${this._result.length}`);
  }

  public getResults(): number[] {
    return this._result;
  }
}

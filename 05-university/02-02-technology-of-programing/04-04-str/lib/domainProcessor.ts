import fs from "fs";
import path from "path";

export interface ProcessedDomain {
  original: string;
  hostname: string;
  levels: number;
  folders: number;
  transformed: string;
  timestamp?: string;
}

class DomainProcessor {
  private readonly dbPath: string;
  private readonly resultsPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), "data", "domains.json");
    this.resultsPath = path.join(process.cwd(), "data", "results.json");
  }

  public readDomains(): string[] {
    try {
      const data = fs.readFileSync(this.dbPath, "utf-8");
      const json = JSON.parse(data);
      return json.domains || [];
    } catch (error) {
      console.error("Ошибка чтения JSON:", error);
      return [];
    }
  }

  public saveResults(results: ProcessedDomain[]): void {
    try {
      const dataWithTimestamp = {
        generated: new Date().toISOString(),
        count: results.length,
        results,
      };

      fs.writeFileSync(
        this.resultsPath,
        JSON.stringify(dataWithTimestamp, null, 2),
      );
      console.log(`Результаты сохранены в ${this.resultsPath}`);
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  }

  public processUrl(url: string): ProcessedDomain | null {
    const regex = /^(https?|ftp):\/\/(?:www\.)?([^\/]+)(\/[^?#]*)?/i;
    const match = url.match(regex);

    if (!match || !url.includes(".com")) return null;

    const [, protocol, hostname, path = ""] = match;

    // Уровни домена
    const domainParts = hostname.split(".").filter((part) => part !== "www");
    const levels = domainParts.length - 1; // минус .com

    // Папки
    const folders = path.split("/").filter((p) => p && !p.includes(".")).length;

    // Замена пробелов
    const encodedPath = path.replace(/ /g, "%20");

    // Новый домен
    const mainDomain = domainParts.slice(-2).join(".");
    const newDomain = `${mainDomain}_${levels}_${folders}.ru`;

    const transformed = `${protocol}://${newDomain}${encodedPath}`;

    return {
      original: url,
      hostname,
      levels,
      folders,
      transformed,
      timestamp: new Date().toISOString(),
    };
  }

  public processAllDomains(): ProcessedDomain[] {
    const domains = this.readDomains();
    const results: ProcessedDomain[] = [];

    for (const domain of domains) {
      const processed = this.processUrl(domain);
      if (processed) {
        results.push(processed);
      }
    }

    return results;
  }

  public run(): void {
    console.log("Начало обработки доменов...");
    const results = this.processAllDomains();
    this.saveResults(results);
    console.log(`Обработано доменов: ${results.length}`);
  }
}

export const domainProcessor = new DomainProcessor();

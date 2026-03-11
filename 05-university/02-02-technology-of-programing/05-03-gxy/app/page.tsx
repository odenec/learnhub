"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Result = {
  x: number;
  y: number;
  result: number;
};

type Calculation = {
  id: number;
  yStart: string;
  yEnd: string;
  yStep: string;
  xValues: string[];
  results: Result[];
  error: string;
  isActive: boolean;
};

export default function Home() {
  const [calculationCount, setCalculationCount] = useState("");
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const generateCalculationFields = () => {
    setGlobalError("");

    const count = parseInt(calculationCount);
    if (isNaN(count) || count <= 0) {
      setGlobalError(
        "Введите корректное количество расчетов (положительное число)",
      );
      return;
    }

    const newCalculations: Calculation[] = [];
    for (let i = 0; i < count; i++) {
      newCalculations.push({
        id: i,
        yStart: "",
        yEnd: "",
        yStep: "",
        xValues: [],
        results: [],
        error: "",
        isActive: i === 0,
      });
    }
    setCalculations(newCalculations);
    setActiveTab(0);
  };

  const handleYParamChange = (
    calcId: number,
    field: keyof Pick<Calculation, "yStart" | "yEnd" | "yStep">,
    value: string,
  ) => {
    setCalculations((prev) =>
      prev.map((calc) =>
        calc.id === calcId ? { ...calc, [field]: value } : calc,
      ),
    );
  };

  const generateXFields = (calcId: number) => {
    const calc = calculations.find((c) => c.id === calcId);
    if (!calc) return;

    const start = parseFloat(calc.yStart);
    const end = parseFloat(calc.yEnd);
    const step = parseFloat(calc.yStep);

    if (isNaN(start) || isNaN(end) || isNaN(step)) {
      setCalculations((prev) =>
        prev.map((c) =>
          c.id === calcId ? { ...c, error: "Заполни все поля Y" } : c,
        ),
      );
      return;
    }

    if (step <= 0) {
      setCalculations((prev) =>
        prev.map((c) =>
          c.id === calcId
            ? { ...c, error: "Шаг должен быть положительным" }
            : c,
        ),
      );
      return;
    }

    if (start > end) {
      setCalculations((prev) =>
        prev.map((c) =>
          c.id === calcId
            ? { ...c, error: "y_start не может быть больше y_end" }
            : c,
        ),
      );
      return;
    }

    const count = Math.floor((end - start) / step) + 1;
    setCalculations((prev) =>
      prev.map((c) =>
        c.id === calcId
          ? { ...c, xValues: Array(count).fill(""), error: "" }
          : c,
      ),
    );
  };

  const handleXChange = (calcId: number, index: number, value: string) => {
    setCalculations((prev) =>
      prev.map((calc) =>
        calc.id === calcId
          ? {
              ...calc,
              xValues: calc.xValues.map((x, i) => (i === index ? value : x)),
            }
          : calc,
      ),
    );
  };

  const handleSubmitAll = async () => {
    setLoading(true);
    setGlobalError("");

    // Подготавливаем данные для отправки
    const calculationsData = calculations.map((calc) => {
      const parsedX = calc.xValues.map((v) => parseFloat(v));
      return {
        y_start: parseFloat(calc.yStart),
        y_end: parseFloat(calc.yEnd),
        y_step: parseFloat(calc.yStep),
        x_values: parsedX,
      };
    });

    // Валидация
    let hasError = false;
    calculations.forEach((calc) => {
      const parsedX = calc.xValues.map((v) => parseFloat(v));
      if (parsedX.some(isNaN) || parsedX.length === 0) {
        setCalculations((prev) =>
          prev.map((c) =>
            c.id === calc.id ? { ...c, error: "Все x должны быть числами" } : c,
          ),
        );
        hasError = true;
      }
    });

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/check-function", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calculations: calculationsData }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Ошибка запроса");
      } else {
        // Обновляем результаты для каждого расчета
        setCalculations((prev) =>
          prev.map((calc, index) => {
            const responseData = data.data[index];
            return {
              ...calc,
              results: responseData?.results || [], // Берем results из ответа
              error: "",
            };
          }),
        );
      }
    } catch (error) {
      setGlobalError("Ошибка при отправке запроса");
    }

    setLoading(false);
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const getTabStatus = (calc: Calculation) => {
    if (calc.results.length > 0) return "✅";
    if (calc.xValues.length > 0) return "📝";
    if (calc.yStart && calc.yEnd && calc.yStep) return "⚙️";
    return "🆕";
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>🧮 Множественные вычисления G(x,y)</h1>

        <div className={styles.controls}>
          <label className={styles.label}>
            Количество расчетов:
            <input
              type="number"
              value={calculationCount}
              onChange={(e) => setCalculationCount(e.target.value)}
              className={styles.input}
              placeholder="3"
              min="1"
            />
          </label>
          <button onClick={generateCalculationFields} className={styles.button}>
            СОЗДАТЬ РАСЧЕТЫ
          </button>
        </div>

        {globalError && <p className={styles.error}>❌ {globalError}</p>}

        {calculations.length > 0 && (
          <>
            <div className={styles.tabsContainer}>
              {calculations.map((calc, index) => (
                <button
                  key={calc.id}
                  className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
                  onClick={() => handleTabClick(index)}
                >
                  <span className={styles.tabIcon}>{getTabStatus(calc)}</span>
                  Расчет #{index + 1}
                </button>
              ))}
            </div>

            <div className={styles.tabContent}>
              {calculations.map((calc, calcIndex) => (
                <div
                  key={calc.id}
                  className={styles.calculationBlock}
                  style={{
                    display: activeTab === calcIndex ? "block" : "none",
                  }}
                >
                  <h3 className={styles.calculationTitle}>
                    Расчет #{calcIndex + 1}
                  </h3>

                  <div className={styles.controls}>
                    <label className={styles.label}>
                      Y_START:
                      <input
                        type="number"
                        value={calc.yStart}
                        onChange={(e) =>
                          handleYParamChange(calc.id, "yStart", e.target.value)
                        }
                        className={styles.input}
                        placeholder="0"
                      />
                    </label>

                    <label className={styles.label}>
                      Y_END:
                      <input
                        type="number"
                        value={calc.yEnd}
                        onChange={(e) =>
                          handleYParamChange(calc.id, "yEnd", e.target.value)
                        }
                        className={styles.input}
                        placeholder="10"
                      />
                    </label>

                    <label className={styles.label}>
                      Y_STEP:
                      <input
                        type="number"
                        value={calc.yStep}
                        onChange={(e) =>
                          handleYParamChange(calc.id, "yStep", e.target.value)
                        }
                        className={styles.input}
                        placeholder="1"
                      />
                    </label>

                    <button
                      onClick={() => generateXFields(calc.id)}
                      className={styles.button}
                    >
                      ЗАДАТЬ Y
                    </button>
                  </div>

                  {calc.error && (
                    <p className={styles.error}>❌ {calc.error}</p>
                  )}

                  {calc.xValues.length > 0 && (
                    <div className={styles.xFieldsSection}>
                      <h4 className={styles.xFieldsTitle}>
                        Введи {calc.xValues.length} значений x для расчета #
                        {calcIndex + 1}:
                      </h4>
                      <div className={styles.xFieldsGrid}>
                        {calc.xValues.map((x, i) => (
                          <input
                            key={i}
                            type="number"
                            value={x}
                            onChange={(e) =>
                              handleXChange(calc.id, i, e.target.value)
                            }
                            placeholder={`x${i + 1}`}
                            className={styles.xField}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {calc.results.length > 0 && (
                    <div className={styles.resultsSection}>
                      <h4 className={styles.resultsTitle}>
                        Результаты для расчета #{calcIndex + 1}:
                      </h4>
                      <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>X</th>
                              <th>Y</th>
                              <th>Y / LG(X)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {calc.results.map((r, i) => (
                              <tr key={i}>
                                <td>{r.x}</td>
                                <td>{r.y}</td>
                                <td>{r.result.toFixed(6)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.globalActions}>
              <button
                onClick={handleSubmitAll}
                disabled={loading}
                className={`${styles.button} ${styles.submitButton}`}
              >
                {loading
                  ? "Отправка всех расчетов..."
                  : "Вычислить все расчеты"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

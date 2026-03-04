import { useState } from "react";
import { LabFanction } from "./func/labfunc1";
import styles from "./style/app.module.css";

function App() {
  const [startValue, setStartValue] = useState("1");
  const [endValue, setEndValue] = useState("10");
  const [results, setResults] = useState<number[]>([]);
  const handleCalculate = () => {
    const labFunction = new LabFanction(Number(startValue), Number(endValue));
    labFunction.calculateRange();
    setResults(labFunction.getResults());
  };

  return (
    <>
      <div>
        <div className={styles.inputDiv}>
          <input
            className={styles.inputClass}
            type="number"
            value={startValue}
            onChange={(e) => setStartValue(e.target.value)}
            placeholder="Начальное значение"
            step="any"
          />
          <input
            className={styles.inputClass}
            type="number"
            value={endValue}
            onChange={(e) => setEndValue(e.target.value)}
            placeholder="Конечное значение"
            step="any"
          />
          <button onClick={handleCalculate}>Рассчитать</button>
        </div>

        {results.length > 0 && (
          <>
            <div className={styles.containerStyle}>
              {results.map((result, index) => (
                <div key={index} className={styles.resultItemStyle}>
                  {index + 1}: {result.toFixed(4)}
                </div>
              ))}
            </div>
            <div>{`start: ${startValue}; end: ${endValue}`}</div>
            <div>Всего результатов: {results.length}</div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

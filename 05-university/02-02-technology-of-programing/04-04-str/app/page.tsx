"use client";

import { useState, useEffect } from "react";
import styles from "./styles/page.module.css";
import { ProcessedDomain } from "@/lib/domainProcessor";

export default function Home() {
  const [results, setResults] = useState<ProcessedDomain[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const fetchDomains = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/domain");
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };

  const addDomain = async () => {
    if (!newUrl) return;

    setLoading(true);
    try {
      await fetch("/api/domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newUrl }),
      });

      setNewUrl("");
      fetchDomains();
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Обработка .com доменов</h1>

      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://example.com/page"
          className={styles.input}
        />
        <button
          onClick={addDomain}
          disabled={loading}
          className={styles.button}
        >
          Добавить
        </button>
        <button
          onClick={fetchDomains}
          disabled={loading}
          className={`${styles.button} ${styles.refreshButton}`}
        >
          Обновить
        </button>
      </div>

      {loading && <div className={styles.loading}>Загрузка...</div>}

      {results.length > 0 && (
        <>
          <div className={styles.stats}>
            <strong>Всего доменов:</strong> {results.length}
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Исходный URL</th>
                  <th>Уровней</th>
                  <th>Папок</th>
                  <th>Результат</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, i) => (
                  <tr key={i}>
                    <td className={styles.urlCell}>{item.original}</td>
                    <td className={styles.centerCell}>{item.levels}</td>
                    <td className={styles.centerCell}>{item.folders}</td>
                    <td className={styles.urlCell}>{item.transformed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

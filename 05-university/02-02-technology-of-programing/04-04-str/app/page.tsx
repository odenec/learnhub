"use client";

import { useState, useEffect } from "react";
import styles from "./styles/page.module.css";
import { ProcessedDomain } from "@/lib/domainProcessor";

export default function Home() {
  const [results, setResults] = useState<ProcessedDomain[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [urlError, setUrlError] = useState("");

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

  const isValidUrl = (url: string): boolean => {
    const urlPattern =
      /^(https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/;
    return urlPattern.test(url) && url.includes(".com");
  };

  const addDomain = async () => {
    if (!newUrl) {
      setUrlError("Введите URL");
      return;
    }

    if (!isValidUrl(newUrl)) {
      setUrlError("Некорректный URL. Допустимы только .com домены");
      return;
    }

    setUrlError("");
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

  const handleStart = async () => {
    setShowResults(false);
    setLoading(true);

    setTimeout(() => {
      setShowResults(true);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Обработка .com доменов</h1>

      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => {
              setNewUrl(e.target.value);
              setUrlError("");
            }}
            placeholder="https://example.com/page"
            className={`${styles.input} ${urlError ? styles.inputError : ""}`}
          />
          {urlError && <div className={styles.errorMessage}>{urlError}</div>}
        </div>

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

      <div className={styles.startSection}>
        <button
          onClick={handleStart}
          disabled={loading}
          className={styles.startButton}
        >
          {loading ? "Обработка..." : "Старт"}
        </button>
      </div>

      {loading && <div className={styles.loading}>Загрузка...</div>}

      {showResults && results.length > 0 && (
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

      {showResults && results.length === 0 && !loading && (
        <div className={styles.noData}>
          Нет данных для отображения. Добавьте домены.
        </div>
      )}
    </div>
  );
}

"use client";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const getFoldPath = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/folder-path");
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      setCurrentPath(data.path);
      setTimeout(() => {
        setCurrentPath("");
      }, 5000);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.genDiv}>
      <header className={styles.headerClass}></header>
      <main className={styles.mainClass}>
        <pre className={styles.textOutput}>{currentPath}</pre>
        <button className={styles.buttonTextOutput} onClick={getFoldPath}>
          {loading ? "loadig..." : "put"}
        </button>
      </main>
    </div>
  );
}

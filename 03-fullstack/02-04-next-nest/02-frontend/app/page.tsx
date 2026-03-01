"use client";
import { useState } from "react";
import styles from "./page.module.css";
interface FolderData {
  path: string;
}
export default function Home() {
  const [dataPath, setDataPath] = useState<{ path?: string }>({});
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState("");
  const handlerCloseButton = () => {
    setDataPath({});
  };
  const getFolderPath = async () => {
    setLoading(true);
    setErrorLoading("");
    try {
      const response = await fetch("http://localhost:3000/folder/path");
      const data = await response.json();
      if (data.error) {
        setErrorLoading(data.error);
        return;
      }
      setDataPath(data);
    } catch (e) {
      if (e instanceof Error) {
        setErrorLoading(e.message);
      } else {
        setErrorLoading("unknow error");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.genDiv}>
      <header className={styles.headerClass}></header>
      <main className={styles.mainClass}>
        {errorLoading ? (
          <pre className={styles.preClass}> {errorLoading}</pre>
        ) : (
          <>
            <div className={styles.divOutput}>
              <button
                className={styles.buttonClose}
                onClick={handlerCloseButton}
              >
                ✕
              </button>
              <pre className={styles.preClass}>{dataPath.path}</pre>
            </div>
            <button onClick={getFolderPath}>
              {loading ? "loading" : "put"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}

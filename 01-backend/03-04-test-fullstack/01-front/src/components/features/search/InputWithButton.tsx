"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import styles from "./inputWithButton.module.css";
export default function InputWithButton() {
  const [text, setText] = useState("");
  const setResponseData = useStore((state) => state.setResponseData);
  const setLoadin = useStore((state) => state.setLoading);
  const loading = useStore((state) => state.loading);
  // const setSuccess = useStore((state) => state.setSuccess);
  // const success = useStore((state) => state.success);

  const handleClick = async () => {
    setLoadin(true);
    // setSuccess(false);
    setResponseData(null);

    //timeOut 5s
    const abortRequestAboutFiveSecund = new AbortController();
    const timeoutFiveSecondForFatch = setTimeout(() => {
      abortRequestAboutFiveSecund.abort();
    }, 5000);

    try {
      const response = await fetch("http://localhost:3001/todos/1", {
        signal: abortRequestAboutFiveSecund.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResponseData(data);
      // setSuccess(true);
      setText("");
      clearTimeout(timeoutFiveSecondForFatch);
    } catch (e) {
      // setSuccess(false);
      setResponseData(null);
    } finally {
      setLoadin(false);
    }
    setText("");
  };

  return (
    <div className={styles.genDiv}>
      <input
        type="text"
        className={styles.input}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="text"
      />
      <button className={styles.button} onClick={handleClick}>
        {loading ? "loading..." : "send GET"}
      </button>
    </div>
  );
}

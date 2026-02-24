"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import style from "./textBox.module.css";

export default function TextBox() {
  const responseData = useStore((state) => state.responseData);
  const loading = useStore((state) => state.loading);
  // const success = useStore((state) => state.success);
  // const [text, setText] = useState("");

  // if (loading) return <div>loading...</div>;
  // if (!responseData) return <div>data empty</div>;

  return (
    <div className={style.genDiv}>
      {loading ? (
        <div>loading...</div>
      ) : responseData ? (
        <div>
          <p>data:</p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <p>Для получения данных введите запрос</p>
        </div>
      )}
    </div>
  );
}

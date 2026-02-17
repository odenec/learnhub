import React, { useState } from "react";

function FORM({ onClose }) {
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = Number(number) + 10;

    alert(result);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Введите число"
      />
      <button type="submit">Добавить 10</button>
    </form>
  );
}

export default FORM;

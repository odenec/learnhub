import { useState } from "react";

function JustForm() {
  const [name, setName] = useState("");

  const handler1 = (event) => {
    event.preventDefault();
    alert(`Привет, ${name}!`);
    setName("");
  };

  return (
    <form onSubmit={handler1}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите ваше имя"
      />
      <button type="submit">Поприветствовать</button>
      <p>Вы ввели: {name}</p>
    </form>
  );
}

export default JustForm;

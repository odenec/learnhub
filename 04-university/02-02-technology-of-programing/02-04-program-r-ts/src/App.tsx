import { useState } from "react";
import { getProgramInfo, calculateSubstance } from "./func/base.service";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [info, setInfo] = useState(false);
  const informationData = JSON.stringify(getProgramInfo(), null, 2);
  const handleButton = (key: string) => {
    if (key === "NO" || key === "NH3") {
      setText(calculateSubstance(key));
      setInfo(false);
    } else {
      console.error("Недопустимое вещество");
    }
  };
  const handleButtonInfo = () => {
    setInfo(true);
  };
  return (
    <>
      <div>
        <button onClick={() => handleButton("NO")}>NO</button>
        <button onClick={() => handleButton("NH3")}>NH3</button>
        <pre>{text}</pre>
        {info && (
          <pre>
            {informationData}
            <button onClick={() => setInfo(false)}>Скрыть инфо</button>
          </pre>
        )}
        <button onClick={handleButtonInfo}>INFO</button>
      </div>
    </>
  );
}

export default App;

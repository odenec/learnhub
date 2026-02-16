import "./App.css";
import { useState } from "react";
import ButtonOne from "./components/ButtonOne";
import ButtonTwo from "./components/ButtonTwo";
import FORM from "./components/FORM";

function App() {
  const [active, setActive] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div>
      <ButtonOne
        active={active}
        setActive={setActive}
        onButtonClick={() => {
          setIsFormOpen(true);
        }}
      />
      <ButtonTwo
        active={active}
        setActive={setActive}
        onButtonClick={() => {
          setIsFormOpen(true);
        }}
      />

      {isFormOpen && <FORM onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

export default App;

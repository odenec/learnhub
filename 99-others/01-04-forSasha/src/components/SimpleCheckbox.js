import { useState } from "react";

function SimpleCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label>Я не согласен</label>
    </div>
  );
}

export default SimpleCheckbox;

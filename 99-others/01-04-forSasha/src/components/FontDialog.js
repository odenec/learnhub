import { useState } from "react";

function SimpleFontDialog({ onClose, onApply }) {
  const [font, setFont] = useState("Arial");
  const [size, setSize] = useState(16);

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        margin: "30px",
        border: "2px solid #333",
      }}
    >
      <h3>Выберите шрифт</h3>

      <div style={{ marginBottom: "10px" }}>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          style={{ padding: "5px", width: "100%" }}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="range"
          min="10"
          max="40"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{ width: "100%" }}
        />
        <div>Размер: {size}px</div>
      </div>

      <div
        style={{
          marginBottom: "10px",
          fontFamily: font,
          fontSize: `${size}px`,
        }}
      >
        Пример текста
      </div>

      <div>
        <button
          onClick={() => onApply && onApply({ font, size })}
          style={{ marginRight: "10px", padding: "5px 15px" }}
        >
          OK
        </button>
        <button onClick={onClose} style={{ padding: "5px 15px" }}>
          Отмена
        </button>
      </div>
    </div>
  );
}

export default SimpleFontDialog;

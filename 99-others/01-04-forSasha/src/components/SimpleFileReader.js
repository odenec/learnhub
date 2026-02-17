import { useState } from "react";

function SimpleFileReader() {
  const [text, setText] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setText(e.target.result);
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFile} />
      <div style={{ marginTop: "10px", padding: "20px" }}>
        {text || "Файл не выбран"}
      </div>
    </div>
  );
}

export default SimpleFileReader;

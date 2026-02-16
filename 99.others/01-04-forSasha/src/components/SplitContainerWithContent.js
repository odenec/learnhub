import { useState, useRef, useEffect } from "react";

function SplitContainerWithContent({ leftContent, rightContent }) {
  const [split, setSplit] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const startDragging = () => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const stopDragging = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newSplit =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;

    const clampedSplit = Math.max(10, Math.min(90, newSplit));
    setSplit(clampedSplit);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        height: "400px",
        border: "1px solid #ddd",
        position: "relative",
      }}
    >
      112321121212
      <div
        style={{
          width: `${split}%`,
          overflow: "auto",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        {leftContent}
      </div>

      {/* Разделитель */}
      <div
        style={{
          width: "8px",
          background: "#ddd",
          cursor: "col-resize",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseDown={startDragging}
        onDoubleClick={() => setSplit(50)}
      >
        <div
          style={{
            width: "2px",
            height: "20px",
            background: "#999",
            borderRadius: "1px",
          }}
        />
      </div>

      21121213131212
      <div
        style={{
          width: `${100 - split}%`,
          overflow: "auto",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        {rightContent}
      </div>
    </div>
  );
}

export default SplitContainerWithContent;

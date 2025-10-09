import { useState } from "react";
import colors from "../data/data";

export default function ColorBox({ color }) {
  const [currentColor, setCurrentColor] = useState(color);

  return (
    <div
      onClick={() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setCurrentColor(randomColor);
      }}
      style={{
        backgroundColor: currentColor,
        width: "50px",
        height: "50px",
      }}
    ></div>
  );
}

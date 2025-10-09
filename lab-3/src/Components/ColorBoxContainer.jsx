import ColorBox from "./ColorBox"
export default function ColorBoxContainer({ colors }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 50px)",
        justifyContent: "center",
        
      }}
    >
      {colors.map((color, index) => (
        <ColorBox key={index} color={color} />
      ))}
    </div>
  );
}

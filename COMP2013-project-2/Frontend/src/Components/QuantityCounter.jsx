export default function QuantityCounter({
  quantity,
  handleAddQuantity,
  handleRemoveQuantity,
  id,
  mode,
}) {
  return (
    <div className="ProductQuantityDiv">
      <button onClick={() => handleRemoveQuantity(id, mode)}>-</button>
      <p>{quantity}</p>
      <button onClick={() => handleAddQuantity(id, mode)}>+</button>
    </div>
  );
}

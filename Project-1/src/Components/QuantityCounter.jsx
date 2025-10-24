//Counter for amount you want in your cart or the amount inside of your cart. 
export default function QuantityCounter({
  productID,
  amount,
  handleAddToQuantity,
  handleRemoveQuantity,
}) {
  return (
    <div className="ProductQuantityDiv">
      <div
        className="QuantityBtn"
        onClick={() => handleRemoveQuantity(productID)}
      >
        -
      </div>

      <span>{amount}</span>

      <div
        className="QuantityBtn"
        onClick={() => handleAddToQuantity(productID)}
      >
        +
      </div>
    </div>
  );
}

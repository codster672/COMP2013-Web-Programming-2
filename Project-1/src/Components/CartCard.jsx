import QuantityCounter from "./QuantityCounter";

export default function CartCard({
  item,
  handleRemoveItem,
  handleChangeCartQuantity,
}) {
  // Convert price string to float for calculations
  const priceAsFloat = parseFloat(item.price.replace("$", ""));

  // Functions for QuantityCounter compatibility
  const handleAddToQuantity = (id) => {
    handleChangeCartQuantity(id, item.amount + 1);
  };

  const handleRemoveQuantity = (id) => {
    if (item.amount > 1) {
      handleChangeCartQuantity(id, item.amount - 1);
    }
  };

  return (
    <div className="CartCard">
      {/* Item details inside of cart as well as quantity counter */}
      <div className="CartLeft">
        <img src={item.image} alt={item.productName} />
        <p>{item.price}</p>

        <QuantityCounter
          productID={item.id}
          amount={item.amount}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
        />
      </div>

      {/* Total/Checkout button and remove button */}
      <div className="CartRight">
        <p>
          <b>Total: ${(priceAsFloat * item.amount).toFixed(2)}</b>
        </p>
        <button
          className="RemoveButton"
          onClick={() => handleRemoveItem(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

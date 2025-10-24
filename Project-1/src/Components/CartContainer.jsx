import CartCard from "./CartCard";

export default function CartContainer({
  cart,
  handleRemoveItem,
  handleChangeCartQuantity,
  handleEmptyCart,
}) {
    // goes through every item in cart and calculates total items and total price
  const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const priceAsFloat = parseFloat(item.price.replace("$", ""));
    return sum + priceAsFloat * item.amount;
  }, 0);

  return (
    // Container for all items inside of cart along with total and checkout button
    <div className="CartContainer">
      <h3>Cart items: {totalItems}</h3>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              handleRemoveItem={handleRemoveItem}
              handleChangeCartQuantity={handleChangeCartQuantity}
            />
          ))}

          <div className="CartListBtns">
            <button className="RemoveButton" onClick={handleEmptyCart}>
              Empty Cart
            </button>
            <button id="BuyButton">
              Checkout: ${totalPrice.toFixed(2)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

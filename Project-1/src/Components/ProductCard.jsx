import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  id,
  img,
  productName,
  brand,
  price,
  amount,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  // Returns all product information along with QuantityCounter and Add to Cart button
  return (
    <div className="ProductCard">
      <img src={img} alt={productName} />
      <h3>{productName}</h3>
      <p>{brand}</p>

      <QuantityCounter
        productID={id}
        amount={amount}
        handleAddToQuantity={handleAddToQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
      />

      <p>{price}</p>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
    </div>
  );
}

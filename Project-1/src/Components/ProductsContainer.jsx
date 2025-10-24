import ProductCard from "./ProductCard";
//Container for all products displayed on the main page
export default function ProductsContainer({
  data,
  productQuantity,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  return (
    <div className="ProductsContainer">
      {data.map((product) => {
        const quantityObj = productQuantity.find((q) => q.id === product.id);
        const amount = quantityObj ? quantityObj.amount : 0;

        return (
          <ProductCard
            key={product.id}
            id={product.id}
            img={product.image}
            productName={product.productName}
            brand={product.brand}
            price={product.price}
            amount={amount}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
}

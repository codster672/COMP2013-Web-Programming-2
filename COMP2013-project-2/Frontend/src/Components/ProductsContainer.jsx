import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleEditProduct,
  handleDeleteProduct,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          productName={product.productName}
          brand={product.brand}
          image={product.image}
          price={product.price}
          quantity={productQuantity.find((q) => q.id === product._id)?.quantity || 0}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer({ data }) {
  const [productQuantity, setProductQuantity] = useState(
    data.map((product) => ({ id: product.id, amount: 0 }))
  );

  const [cart, setCart] = useState([]);

  // quantity controls
  const handleAddToQuantity = (productID) => {
    setProductQuantity((prev) =>
      prev.map((prod) =>
        prod.id === productID
          ? { ...prod, amount: prod.amount + 1 }
          : prod
      )
    );
  };

  const handleRemoveQuantity = (productID) => {
    setProductQuantity((prev) =>
      prev.map((prod) =>
        prod.id === productID && prod.amount > 0
          ? { ...prod, amount: prod.amount - 1 }
          : prod
      )
    );
  };

  // Add to cart
  const handleAddToCart = (productID) => {
    const selected = data.find((p) => p.id === productID);
    const quantityInfo = productQuantity.find((q) => q.id === productID);
    const amount = quantityInfo?.amount || 0;

    if (amount === 0) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productID);
      if (existing) {
        return prevCart.map((item) =>
          item.id === productID
            ? { ...item, amount: item.amount + amount }
            : item
        );
      } else {
        return [...prevCart, { ...selected, amount }];
      }
    });

    // reset selector back to 0 after adding
    setProductQuantity((prev) =>
      prev.map((p) =>
        p.id === productID ? { ...p, amount: 0 } : p
      )
    );
  };

  // Empty cart completely
  const handleEmptyCart = () => setCart([]);

  // Remove a single item
  const handleRemoveItem = (productID) =>
    setCart((prev) => prev.filter((item) => item.id !== productID));

  // Change item quantity directly from cart
  const handleChangeCartQuantity = (productID, newAmount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productID ? { ...item, amount: newAmount } : item
      )
    );
  };

  return (
    <div>
      <NavBar />
      <div className="GroceriesApp-Container">  
        
        <ProductsContainer
          data={data}
          productQuantity={productQuantity}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />

        <CartContainer
          cart={cart}
          handleRemoveItem={handleRemoveItem}
          handleChangeCartQuantity={handleChangeCartQuantity}
          handleEmptyCart={handleEmptyCart}
        />
      </div>
    </div>
  );
}

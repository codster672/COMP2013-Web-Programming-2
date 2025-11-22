import { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "./NavBar";
import ProductForm from "./ProductForm";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";

export default function GroceriesAppContainer() {
  //State 
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [cart, setCart] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [postResponse, setPostResponse] = useState(null);

  const isEditing = !!editingProduct;

  //Load products 
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const items = res.data;
      setProducts(items);
      setQuantities(items.map((p) => ({ id: p._id, quantity: 0 })));
    } catch (err) {
      console.log(err);
    }
  };

  const refreshProducts = () => loadProducts();

  // Quantity 
  const updateQuantity = (id, mode, change) => {
    if (mode === "cart") {
      setCart((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
      );
      return;
    }

    setQuantities((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, quantity: Math.max(0, q.quantity + change) } : q
      )
    );
  };

  const handleAddQuantity = (id, mode) => updateQuantity(id, mode, +1);
  const handleRemoveQuantity = (id, mode) => updateQuantity(id, mode, -1);

  // Cart 
  const handleAddToCart = (id) => {
    const product = products.find((p) => p._id === id);
    const qty = quantities.find((q) => q.id === id)?.quantity || 0;

    if (qty === 0) {
      alert(`Choose a quantity for ${product.productName}`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item._id === id);
      if (existing) {
        return prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const handleRemoveFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item._id !== id));
  const handleClearCart = () => setCart([]);

  //Product Management 
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductName(product.productName);
    setBrand(product.brand);
    setImage(product.image);
    setPrice(product.price);
  };

  const clearEdit = () => {
    setEditingProduct(null);
    setProductName("");
    setBrand("");
    setImage("");
    setPrice("");
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      refreshProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "productName") setProductName(value);
    if (name === "brand") setBrand(value);
    if (name === "image") setImage(value);
    if (name === "price") setPrice(value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = { productName, brand, image, price };

    try {
      if (isEditing) {
        await axios.patch(
          `http://localhost:3000/products/${editingProduct._id}`,
          data
        );
        setPostResponse({ message: `${productName} updated successfully` });
      } else {
        await axios.post("http://localhost:3000/products", data);
        setPostResponse({ message: `${productName} added successfully` });
      }

      refreshProducts();
      clearEdit();
    } catch (err) {
      console.log(err);
      setPostResponse({ message: "Error submitting product" });
    }
  };

  //Render 
  return (
    <div>
      <NavBar quantity={cart.length} />

      <div className="GroceriesApp-Container">
        <ProductForm
          productName={productName}
          brand={brand}
          image={image}
          price={price}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          isEditing={isEditing}
          postResponse={postResponse}
        />

        <ProductsContainer
          products={products}
          productQuantity={quantities}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />

        <CartContainer
          cartList={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}

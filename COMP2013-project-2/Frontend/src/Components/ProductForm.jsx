export default function ProductForm({
  productToEdit,
  handleOnChange,
  handleOnSubmit,
  productName,
  brand,
  image,
  price,
  isEditing,
  postResponse,
}) {
  return (
    <div>
      <h2>Product Form</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={handleOnChange}
          placeholder="Product Name"
          required
        />
        <br />
        <input
          type="text"
          name="brand"
          value={brand}
          onChange={handleOnChange}
          placeholder="Brand"
          required
        />
        <br />
        <input
          type="text"
          name="image"
          value={image}
          onChange={handleOnChange}
          placeholder="Image Link"
        />
        <br />
        <input
          type="text"
          name="price"
          value={price}
          onChange={handleOnChange}
          placeholder="Price"
          required
        />
        <br />
        <button>{isEditing ? "Update" : "Submit"}</button>
      </form>
      <p>{postResponse?.message}</p>
    </div>
  );
}

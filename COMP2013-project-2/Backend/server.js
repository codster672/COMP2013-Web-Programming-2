// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_URI } = process.env;
const Product = require("./models/product");

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// Connectiong to MongoDB and starting server
mongoose.connect(DB_URI).then(() => {
    server.listen(port, () => {
      console.log(`Database is connected\nServer is running on port ${port}`);
    });
  }).catch((error) => console.log(error.message));

/// --- ROUTES ---

// Root
server.get("/", (request, response) => {
  response.send("Server is alive!");
});

// GET all products
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});



// POST - add A product
server.post("/products", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const newProduct = new Product({ productName, brand, image, price });
  try {
    await newProduct.save();
    response.status(200).send({
      message: `${productName} Added Successfully ${crypto.randomUUID()}`, // sending random uuid in message, not the actual mongoDb _id
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// PATCH - UPdate product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, image, price } = request.body;
  try {
    await Product.findByIdAndUpdate(id, { productName, brand, image, price });
    response.send({
      // instaed of using the time/date function to send a unique message everytime we patch/update the product, i added random uuid in message,
      // so now I can edit the same product multiple times ans it will get updated on app
      // as evertime the message is unique so useEffect triggers a re-fetch
      message: `${productName} UPdated Successfully with id ${id}\n${crypto.randomUUID()}`,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//to update a product by id
server.put("/products/:id", async (request, response) => {
    const { id } = request.params;
    const { productName, brand, image, price } = request.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, brand, image, price },
            { new: true }
        );

        if (!updatedProduct) {
            return response.status(404).send({ message: `Product not found with id: ${id}` });
        }

        response.send({
            message: `Product has been updated with id ${id}`,
            date: new Date(Date.now()),
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});


// DELETE a product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await Product.findByIdAndDelete(id);
    response.send({
      message: `Product Deleted Successfully with id ${id}`,
    });
  } catch (error) {
    response.status(404).send({ message: error.message });
  }
});
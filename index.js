const express = require('express');
const createProduct = require('./products/createProduct');
const getAllProducts = require('./products/getAllProducts');
const getProduct = require('./products/getProduct');
const updateProduct = require('./products/updateProduct');
const deleteProduct = require('./products/deleteProduct');

const createCart = require('./cart/createCart');
const getAllCart = require('./cart/getAllCarts');
const getCart = require('./cart/getCart');
const updateCart = require('./cart/updateCart');
const deleteCart = require('./cart/deleteCart');

const app = express();
const port = 3000;

app.use(express.json());

// products API
app.post("/api/products/create", createProduct);
app.get("/api/products/get", getAllProducts);
app.get("/api/products/get/:id", getProduct);
app.patch("/api/products/update/:id", updateProduct);
app.delete("/api/products/delete/:id", deleteProduct);

// cart API
app.post("/api/cart/create/:id", createCart);
app.get("/api/cart/get", getAllCart);
app.get("/api/cart/get/:id", getCart);
app.patch("/api/cart/update/:id", updateCart);
app.delete("/api/cart/delete/:id", deleteCart);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
})


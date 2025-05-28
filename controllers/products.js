import { v4 as uuid } from "uuid";
import { getProducts, saveProducts } from "../models/products.js";

export const getAllProducts = (req, res) => {
  const products = getProducts();
  res.json(products);
};

export const getProductById = (req, res) => {
  const products = getProducts();
  const product = products.find((p) => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ error: "products not found" });
  }
  res.json(product);
};

export const createProduct = (req, res) => {
  const products = getProducts();

  const {
    name,
    size,
    price,
    image,
    color,
    style,
    brand,
    detail,
    length,
    material,
    isMaster,
    categoryId,
  } = req.body;
  const newProduct = {
    id: uuid(),
    name,
    size,
    price,
    image,
    color,
    style,
    brand,
    detail,
    length,
    material,
    isMaster,
    categoryId,
  };

  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const products = getProducts();

  const product = products.find((f) => f.id == req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.size = req.body.size || product.size;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.color = req.body.color || product.color;
    product.style = req.body.style || product.style;
    product.brand = req.body.brand || product.brand;
    product.detail = req.body.detail || product.detail;
    product.length = req.body.length || product.length;
    product.material = req.body.material || product.material;
    product.isMaster = req.body.isMaster || product.isMaster;
    product.categoryId = req.body.categoryId || product.categoryId;
    res.json(product);
    saveProducts(products);
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

export const deleteProduct = (req, res) => {
  let products = getProducts();
  const filtered = products.filter((c) => c.id !== req.params.id);
  if (filtered.length === products.length) {
    return res.status(404).json({ error: "product not found" });
  }
  saveProducts(filtered);
  res.json({ message: "Deleted" });
};

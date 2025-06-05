import { v4 as uuid } from "uuid";
import { getProducts, saveProducts } from "../models/products.js";

export const getAllProducts = (req, res) => {
  const { search } = req.query;
  let products = getProducts();

  if (search) {
    const keyword = search.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(keyword));
  }
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
    color,
    style,
    brand,
    detail,
    length,
    material,
    isMaster,
    categoryId,
  } = req.body;

  const image = req.file ? `/data/users/${req.file.filename}` : "";

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

  if (!product) return res.status(404).json({ message: "Product not found" });

  if (req.file) {
    const oldImagePath = product.image?.split("/data/")[1];
    if (oldImagePath) {
      const fullPath = path.join("data", oldImagePath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    product.image = `/data/products/${req.file.filename}`;
  }

  product.name = req.body.name || product.name;
  product.size = req.body.size || product.size;
  product.price = req.body.price || product.price;
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

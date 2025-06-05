import { v4 as uuid } from "uuid";
import { getcategory, savecategory } from "../models/category.js";

export const getAllCategories = (req, res) => {
  const categories = getcategory();
  res.json(categories);
};

export const getCategoryById = (req, res) => {
  const categories = getcategory();
  const category = categories.find((c) => c.id == req.params.id);

  if (!category) {
    return res.status(404).json({ error: "category not found" });
  }
  res.json(category);
};

export const createCategory = (req, res) => {
  const categories = getcategory();

  const { name, description, shortDescription } = req.body;

  const imageUrl = req.file ? `/data/categories/${req.file.filename}` : "";

  const newCategory = {
    id: uuid(),
    name,
    imageUrl,
    description,
    shortDescription,
  };

  categories.push(newCategory);
  savecategory(categories);
  res.status(201).json(newCategory);
};

export const updateCategory = (req, res) => {
  const categories = getcategory();
  const category = categories.find((c) => c.id == req.params.id);

  if (!category) return res.status(404).json({ message: "Category not found" });

  if (req.file) {
    const oldImagePath = category.imageUrl?.split("/data/")[1];
    if (oldImagePath) {
      const fullPath = path.join("data", oldImagePath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    category.imageUrl = `/data/categories/${req.file.filename}`;
  }
  category.name = req.body.name || category.name;
  category.description = req.body.description || category.description;
  category.shortDescription =
    req.body.shortDescription || category.shortDescription;
  res.json(category);
  savecategory(categories);
};

export const deleteCategory = (req, res) => {
  let categories = getcategory();
  const filtered = categories.filter((c) => c.id !== req.params.id);
  if (filtered.length === categories.length) {
    return res.status(404).json({ error: "category not found" });
  }
  savecategory(filtered);
  res.json({ message: "Deleted" });
};

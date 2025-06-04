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

  const { name, imageUrl, description, shortDescription } = req.body;
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
  if (category) {
    category.name = req.body.name || category.name;
    category.imageUrl = req.body.imageUrl || category.imageUrl;
    category.description = req.body.description || category.description;
    category.shortDescription =
      req.body.shortDescription || category.shortDescription;
    res.json(category);
    savecategory(categories);
  } else {
    res.status(404).json({ message: "category not found" });
  }
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

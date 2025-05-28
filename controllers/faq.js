import { v4 as uuid } from "uuid";
import { getfaq, savefaq } from "../models/faq.js";

export const getAllFaqs = (req, res) => {
  const faqs = getfaq();
  res.json(faqs);
};

export const getFaqById = (req, res) => {
  const faqs = getfaq();
  const faq = faqs.find((f) => f.id == req.params.id);

  if (!faq) {
    return res.status(404).json({ error: "faqs not found" });
  }
  res.json(faq);
};

export const createFaq = (req, res) => {
  const faqs = getfaq();

  const { categoryId, title, description, locale } = req.body;
  const newFaq = {
    id: uuid(),
    title,
    locale,
    categoryId,
    description,
  };

  faqs.push(newFaq);
  savefaq(faqs);
  res.status(201).json(newFaq);
};

export const updateFaq = (req, res) => {
  const faqs = getfaq();

  const faq = faqs.find((f) => f.id == req.params.id);
  if (faq) {
    faq.title = req.body.title || faq.title;
    faq.locale = req.body.locale || faq.locale;
    faq.categoryId = req.body.categoryId || faq.categoryId;
    faq.description = req.body.description || faq.description;
    res.json(faq);
    savefaq(faqs);
  } else {
    res.status(404).json({ message: "faq not found" });
  }
};

export const deleteFaq = (req, res) => {
  let faqs = getfaq();
  const filtered = faqs.filter((c) => c.id !== req.params.id);
  if (filtered.length === faqs.length) {
    return res.status(404).json({ error: "faq not found" });
  }
  savefaq(filtered);
  res.json({ message: "Deleted" });
};

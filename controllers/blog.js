import { getblog, saveblog } from "../models/blog.js";
// import { v4 as uuid } from "uuid";

export const getAllblogs = (req, res) => {
  const blogs = getblog();
  res.json(blogs);
};

export const getBlogById = (req, res) => {
  const blogs = getblog();
  const blog = blogs.find((b) => b.id == req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(blog);
};
export const createBlog = (req, res) => {
  const blogs = getblog();
  const newBlog = { ...req.body };
  blogs.push(newBlog);
  saveblog(blogs);
  res.status(201).json(newBlog);
};
export const updateBlog = (req, res) => {
  const blogs = getblog();
  const index = blogs.findIndex((b) => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Blog not found" });
  }
  blogs[index] = { ...blogs[index], ...req.body };
  saveblog(blogs);
  res.json(blogs[index]);
};
export const deleteBlog = (req, res) => {
  let blogs = getblog();
  const filtered = blogs.filter((b) => b.id !== req.params.id);
  if (filtered.length === blogs.length) {
    return res.status(404).json({ error: "Blog not found" });
  }
  saveblog(filtered);
  res.json({ message: "Deleted" });
};

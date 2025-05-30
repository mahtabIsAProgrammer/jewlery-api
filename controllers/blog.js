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

  const { authorId, authorName, title, thumbnail, published, commentsCount } =
    req.body;
  const newBlog = {
    id: uuid(),
    authorId,
    authorName,
    title,
    thumbnail,
    published,
    commentsCount,
  };

  blogs.push(newBlog);
  saveblog(blogs);
  res.status(201).json(newBlog);
};
export const updateBlog = (req, res) => {
  const blogs = getblog();

  const blog = blogs.find((c) => c.id == req.params.id);
  if (blog) {
    blog.authorId = req.body.authorId || blog.authorId;
    blog.authorName = req.body.authorName || blog.authorName;
    blog.title = req.body.title || blog.title;
    blog.thumbnail = req.body.thumbnail || blog.thumbnail;
    blog.published = req.body.published || blog.published;
    blog.commentsCount = req.body.commentsCount || blog.commentsCount;
    res.json(blog);
    saveblog(blogs);
  } else {
    res.status(404).json({ message: "blog not found" });
  }
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

import { v4 as uuid } from "uuid";
import { getcomment, savecomment } from "../models/comment.js";

export const getAllComments = (req, res) => {
  const { search } = req.query;
  let comments = getcomment();

  if (search) {
    const keyword = search.toLowerCase();
    comments = comments.filter((c) =>
      c.productName.toLowerCase().includes(keyword)
    );
  }
  res.json(comments);
};

export const getCommentById = (req, res) => {
  const comments = getcomment();
  const comment = comments.find((c) => c.id == req.params.id);

  if (!comment) {
    return res.status(404).json({ error: "comments not found" });
  }
  res.json(comment);
};

export const createComment = (req, res) => {
  const comments = getcomment();

  const {
    rate,
    type,
    title,
    userId,
    blogId,
    comment,
    userEmial,
    productId,
    isAccepted,
    createOn,
    productName,
  } = req.body;
  const newComment = {
    id: uuid(),
    rate,
    type,
    title,
    userId,
    blogId,
    comment,
    userEmial,
    productId,
    isAccepted,
    createOn,
    productName,
  };

  comments.push(newComment);
  savecomment(comments);
  res.status(201).json(newComment);
};

export const updateComment = (req, res) => {
  const comments = getcomment();

  const comment = comments.find((c) => c.id == req.params.id);
  if (comment) {
    comment.rate = req.body.rate || comment.rate;
    comment.type = req.body.type || comment.type;
    comment.title = req.body.title || comment.title;
    comment.userId = req.body.userId || comment.userId;
    comment.blogId = req.body.blogId || comment.blogId;
    comment.comment = req.body.comment || comment.comment;
    comment.userEmial = req.body.userEmial || comment.userEmial;
    comment.productId = req.body.productId || comment.productId;
    comment.isAccepted = req.body.isAccepted || comment.isAccepted;
    comment.createOn = req.body.createOn || comment.createOn;
    comment.productName = req.body.productName || comment.productName;
    res.json(comment);
    savecomment(comments);
  } else {
    res.status(404).json({ message: "comment not found" });
  }
};

export const deleteComment = (req, res) => {
  let comments = getcomment();
  const filtered = comments.filter((c) => c.id !== req.params.id);
  if (filtered.length === comments.length) {
    return res.status(404).json({ error: "comment not found" });
  }
  savecomment(filtered);
  res.json({ message: "Deleted" });
};

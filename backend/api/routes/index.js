import { Router } from "express";

const router = Router();

const posts = [];

router.get("/posts", (req, res) => {
  res.json(posts);
});

router.post("/posts", (req, res) => {
  const post = {
    id: posts.length + 1,
    ...req.body,
  };

  posts.push(post);

  res.status(201).json(post);
});

router.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;

  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    ...updatedData,
  };

  res.json(posts[postIndex]);
});

router.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deletedPost = posts[postIndex];

  posts.splice(postIndex, 1);

  res.json(deletedPost);
});

export default router;

import { Router } from "express";
import Post from "../../models/Post.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
const router = Router();

// Get posts

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.user) {
      filter.user = req.query.user;
    }
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate("user", "username avatar");

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get post by ID

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username avatar",
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
});

// Post a post

router.post("/", authMiddleware, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Patch a post

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    await post.save();

    res.json(post);
  } catch {
    res.status(400).json({ message: "Invalid post ID or data" });
  }
});

// Delete a post

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Invalid post ID" });
  }
});

export default router;

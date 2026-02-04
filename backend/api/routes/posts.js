import { Router } from "express";
import Post from "../../models/Post.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
const router = Router();

// router.get("/", (req, res) => {
//   try {
//     const postsWithUser = posts.map((post) => {
//       const user = users.find((u) => u._id === post.userId);

//       if (!user) {
//         throw new Error(`User not found for post ${post._id}`);
//       }

//       return {
//         _id: post._id,
//         title: post.title,
//         content: post.content,
//         userId: user._id,
//         userName: user.name,
//       };
//     });

//     res.json(postsWithUser);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/:id", (req, res) => {
//   try {
//     const { id } = req.params;

//     const post = posts.find((p) => p._id === id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.json(post);
//   } catch (err) {
//     res.status(400).json({ message: "Invalid post ID" });
//   }
// });

// router.post("/", (req, res) => {
//   try {
//     const { title, content, userId } = req.body;

//     if (!title || !content) {
//       return res
//         .status(400)
//         .json({ message: "Title and content are required" });
//     }

//     const newPost = {
//       _id: Date.now().toString(), // id simplu, unic
//       userId: userId || "1", // mock user
//       title,
//       content,
//     };

//     posts.unshift(newPost); // adăugăm sus, ca sort desc

//     res.status(201).json(newPost);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// MongoDB

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

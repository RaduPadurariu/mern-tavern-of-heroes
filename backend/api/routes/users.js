import { Router } from "express";
import User from "../../models/User.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

// Get Users

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user by ID

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
});

// Patch - Edit Profile

router.patch("/me", authMiddleware, async (req, res) => {
  try {
    const updates = {};

    if ("nickname" in req.body) updates.nickname = req.body.nickname;
    if ("heroClass" in req.body) updates.heroClass = req.body.heroClass;
    if ("gender" in req.body) {
      updates.gender = req.body.gender;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Account

router.delete("/me", authMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete account" });
  }
});

export default router;

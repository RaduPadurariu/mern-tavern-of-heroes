import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { loginSchema, registerSchema } from "../../schemas/auth.schema.js";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

// LOGOUT

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out" });
});

// LOGIN

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // JWT

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// // REGISTER

router.post("/", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { username, email, password } = parsed.data;

  try {
    // Check username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({
        errors: { username: ["Username already exists"] },
      });
    }

    // Check email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        errors: { email: ["Email already exists"] },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // JWT

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

export default router;

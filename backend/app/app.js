import express from "express";
import cors from "cors";
import postRoutes from "../api/routes/posts.js";
import usersRoutes from "../api/routes/users.js";
import authRoutes from "../api/routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;

import express from "express";
import cors from "cors";
import postRoutes from "../api/routes/posts.js";
import usersRoutes from "../api/routes/users.js";
import authRoutes from "../api/routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://tavernofheroes.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: true,
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

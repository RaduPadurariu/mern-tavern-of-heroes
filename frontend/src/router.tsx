import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import Posts from "./pages/Posts";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "heroes", element: <Heroes /> },
      { path: "login", element: <LogIn /> },
      { path: "register", element: <SignUp /> },
      { path: "posts", element: <Posts /> },
    ],
  },
]);

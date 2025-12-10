import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Account from "./pages/Account";
import Posts from "./pages/Posts";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Heroes from "./pages/Heroes";

import EditProfile from "./pages/EditProfile";
import CreateProfile from "./pages/CreateProfile";
import Landing from "./pages/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "heroes", element: <Heroes /> },
      { path: "login", element: <LogIn /> },
      { path: "register", element: <SignUp /> },
      { path: "posts", element: <Posts /> },
      {
        path: "account",
        children: [
          { index: true, element: <Account /> },
          { path: "edit-profile", element: <EditProfile /> },
          { path: "create-profile", element: <CreateProfile /> },
        ],
      },
    ],
  },
]);

import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Account from "../pages/users/Account";
import Posts from "../pages/posts/Posts";
import SignUp from "../pages/auth/SignUp";
import LogIn from "../pages/auth/LogIn";
import Landing from "../pages/Landing";
import { postsLoader } from "./loaders/postsLoader";
import { newPostAction } from "./actions/newPostAction";
import { usersLoader } from "./loaders/usersLoader";
import EditProfile from "../pages/users/EditProfile";
import SinglePost from "../pages/posts/SinglePost";
import NewPost from "../pages/posts/NewPost";
import EditPost from "../pages/posts/EditPost";
import Users from "../pages/users/Users";
import { singlePostLoader } from "./loaders/singlePostLoader";
import { editPostAction } from "./actions/editPostAction";
import { deletePostAction } from "./actions/deletePostAction";
import SingleUser from "../pages/users/SingleUser";
import { singleUserLoader } from "./loaders/singleUserLoader";
import { registerUserAction } from "./actions/registerUserAction";
import { logoutUserAction } from "./actions/logoutUserAction";
import { guestLoader } from "./loaders/guestLoader";
import { loginUserAction } from "./actions/loginUserAction";
import { editUserAction } from "./actions/editUserAction";
import { deleteUserAction } from "./actions/deleteUserAction";
import AccountLayout from "../layouts/AccountLayout";
import { authLoader } from "./loaders/authLoader";
import { editPostLoader } from "./loaders/editPostLoader";
import RootLayoutError from "../components/Errors/RootLayoutError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    action: logoutUserAction,
    errorElement: <RootLayoutError />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "users",
        children: [
          { index: true, element: <Users />, loader: usersLoader },
          { path: ":id", element: <SingleUser />, loader: singleUserLoader },
        ],
      },
      {
        path: "login",
        element: <LogIn />,
        loader: guestLoader,
        action: loginUserAction,
      },
      {
        path: "register",
        element: <SignUp />,
        loader: guestLoader,
        action: registerUserAction,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <Posts />,
            loader: postsLoader,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <SinglePost />,
                loader: singlePostLoader,
                action: deletePostAction,
              },
              {
                path: "edit",
                element: <EditPost />,
                loader: editPostLoader,
                action: editPostAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewPost />,
            loader: authLoader,
            action: newPostAction,
          },
        ],
      },
      {
        path: "account",
        element: <AccountLayout />,
        loader: authLoader,
        action: deleteUserAction,
        children: [
          { index: true, element: <Account /> },
          {
            path: "edit-profile",
            element: <EditProfile />,
            action: editUserAction,
          },
        ],
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

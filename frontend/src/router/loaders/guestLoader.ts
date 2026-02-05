import { redirect } from "react-router";

export async function guestLoader() {
  // const res = await fetch("http://localhost:3000/api/auth/me",
  const res = await fetch(
    "https://mern-tavern-of-heroes.onrender.com/api/auth/me",
    {
      credentials: "include",
    },
  );

  if (res.ok) {
    return redirect("/posts");
  }

  return null;
}

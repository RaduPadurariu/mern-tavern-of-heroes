import { redirect } from "react-router";

export async function logoutUserAction() {
  const res = await fetch(
    "https://mern-tavern-of-heroes.onrender.com/api/auth/logout",
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Response("Failed logout", { status: 500 });
  }

  return redirect("/posts");
}

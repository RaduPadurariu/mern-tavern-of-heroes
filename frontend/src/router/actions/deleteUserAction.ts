import { redirect } from "react-router";

export async function deleteUserAction() {
  const res = await fetch(
    "https://mern-tavern-of-heroes.onrender.com/api/users/me",
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Response("Failed to delete account", { status: res.status });
  }

  return redirect("/login");
}

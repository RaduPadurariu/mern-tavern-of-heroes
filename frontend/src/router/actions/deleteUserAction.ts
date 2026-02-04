import { redirect } from "react-router";

export async function deleteUserAction() {
  const res = await fetch("/api/users/me", {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Response("Failed to delete account", { status: res.status });
  }

  return redirect("/login");
}

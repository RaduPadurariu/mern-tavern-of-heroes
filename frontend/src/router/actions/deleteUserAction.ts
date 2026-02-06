import { redirect } from "react-router";
import { API_URL } from "../../config/api";

export async function deleteUserAction() {
  const res = await fetch(`${API_URL}/api/users/me`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Response("Failed to delete account", { status: res.status });
  }

  return redirect("/login");
}

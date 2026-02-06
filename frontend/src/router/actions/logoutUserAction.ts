import { redirect } from "react-router";
import { API_URL } from "../../config/api";

export async function logoutUserAction() {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Response("Failed logout", { status: 500 });
  }

  return redirect("/");
}

import { redirect } from "react-router";
import { API_URL } from "../../config/api";

export async function authLoader() {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) throw redirect("/login");

  return null;
}

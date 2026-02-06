import { API_URL } from "../../config/api";

export async function usersLoader() {
  const res = await fetch(`${API_URL}/api/users`);

  if (!res.ok) {
    throw new Response("Failed to fetch users", {
      status: res.status,
    });
  }

  return res.json();
}

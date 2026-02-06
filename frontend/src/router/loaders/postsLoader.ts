import { API_URL } from "../../config/api";

export async function postsLoader() {
  const res = await fetch(`${API_URL}/api/posts`);

  if (!res.ok) {
    throw new Response("Failed to fetch posts", {
      status: res.status,
    });
  }
  return res.json();
}

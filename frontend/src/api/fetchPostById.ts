import { API_URL } from "../config/api";

export async function fetchPostById(postId: string) {
  const postRes = await fetch(`${API_URL}/api/posts/${postId}`);

  if (!postRes.ok) {
    throw new Response("Failed to fetch post", {
      status: postRes.status,
    });
  }

  return postRes.json();
}

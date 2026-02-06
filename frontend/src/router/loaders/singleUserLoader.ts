import type { LoaderFunctionArgs } from "react-router";
import { API_URL } from "../../config/api";

export async function singleUserLoader({ params }: LoaderFunctionArgs) {
  const userId = params.id;

  const [userRes, postsRes] = await Promise.all([
    fetch(`${API_URL}/api/users/${userId}`),
    fetch(`${API_URL}/api/posts?user=${userId}`),
  ]);

  const user = await userRes.json();
  const posts = await postsRes.json();

  return { user, posts };
}

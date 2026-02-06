import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { API_URL } from "../../config/api";

export async function editPostLoader({ params }: LoaderFunctionArgs) {
  const authRes = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });

  if (!authRes.ok) {
    throw redirect("/login");
  }

  const postRes = await fetch(`${API_URL}/api/posts/${params.id}`);

  if (!postRes.ok) {
    throw new Response("Failed to fetch post", {
      status: postRes.status,
    });
  }

  return postRes.json();
}

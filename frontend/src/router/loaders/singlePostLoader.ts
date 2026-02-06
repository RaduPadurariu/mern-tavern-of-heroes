import { type LoaderFunctionArgs } from "react-router";
import { API_URL } from "../../config/api";

export async function singlePostLoader({ params }: LoaderFunctionArgs) {
  const postRes = await fetch(`${API_URL}/api/posts/${params.id}`);

  if (!postRes.ok) {
    throw new Response("Failed to fetch single post", {
      status: postRes.status,
    });
  }
  return postRes.json();
}

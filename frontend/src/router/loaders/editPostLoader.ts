import type { LoaderFunctionArgs } from "react-router";
import { requireAuth } from "../../api/requireAuth";
import { fetchPostById } from "../../api/fetchPostById";

export async function editPostLoader({ params }: LoaderFunctionArgs) {
  await requireAuth();

  const postId = params.id;
  if (!postId) {
    throw new Response("Post ID missing", { status: 400 });
  }

  return fetchPostById(postId);
}

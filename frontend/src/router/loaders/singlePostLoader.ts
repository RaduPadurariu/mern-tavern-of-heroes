import { type LoaderFunctionArgs } from "react-router";
import { fetchPostById } from "../../api/fetchPostById";

export async function singlePostLoader({ params }: LoaderFunctionArgs) {
  const postId = params.id;
  if (!postId) {
    throw new Response("Post ID missing", { status: 400 });
  }

  return fetchPostById(postId);
}

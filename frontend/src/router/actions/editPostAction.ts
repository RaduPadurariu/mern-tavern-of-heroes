import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";

export async function editPostAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const postId = params.id;

  if (!postId) {
    throw new Response("Post ID missing", { status: 400 });
  }

  const updatedPost = {
    title,
    content,
  };

  const res = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });

  if (!res.ok) {
    throw new Response("Failed to update post", { status: 500 });
  }

  return redirect(`/posts/${postId}`);
}

import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { API_URL } from "../../config/api";

export async function deletePostAction({ params }: ActionFunctionArgs) {
  const res = await fetch(`${API_URL}/api/posts/${params.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Response("Failed to delete post", { status: 500 });
  }

  return redirect("/posts");
}

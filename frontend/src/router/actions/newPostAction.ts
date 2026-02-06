import { redirect, type ActionFunctionArgs } from "react-router";
import { API_URL } from "../../config/api";

export async function newPostAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  const newPost = {
    title,
    content,
  };

  const res = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
    credentials: "include",
  });

  if (res.status === 401) {
    throw new Response("Not authenticated", { status: 401 });
  }

  if (!res.ok) {
    throw new Response("Failed to create post", { status: 500 });
  }
  return redirect("/posts");
}

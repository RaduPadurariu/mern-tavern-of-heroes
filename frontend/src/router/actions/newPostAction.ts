import { redirect, type ActionFunctionArgs } from "react-router";

export async function newPostAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  const newPost = {
    title,
    content,
  };

  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    throw new Response("Failed to create post", { status: 500 });
  }
  return redirect("/posts");
}

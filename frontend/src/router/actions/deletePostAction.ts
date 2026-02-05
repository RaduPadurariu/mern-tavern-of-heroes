import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";

export async function deletePostAction({ params }: ActionFunctionArgs) {
  const res = await fetch(
    `https://mern-tavern-of-heroes.onrender.com/api/posts/${params.id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.ok) {
    throw new Response("Failed to delete post", { status: 500 });
  }

  return redirect("/posts");
}

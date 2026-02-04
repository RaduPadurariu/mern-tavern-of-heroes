import type { LoaderFunctionArgs } from "react-router";

export async function singlePostLoader({ params }: LoaderFunctionArgs) {
  const res = await fetch(`/api/posts/${params.id}`);

  if (!res.ok) {
    throw new Response("Failed to fetch single post", {
      status: res.status,
    });
  }
  return res.json();
}

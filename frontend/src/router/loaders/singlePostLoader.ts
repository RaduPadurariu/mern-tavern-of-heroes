import type { LoaderFunctionArgs } from "react-router";

export async function singlePostLoader({ params }: LoaderFunctionArgs) {
  // const res = await fetch(`http://localhost:3000/api/posts/${params.id}`);
  const res = await fetch(
    `https://mern-tavern-of-heroes.onrender.com/api/posts/${params.id}`,
  );

  if (!res.ok) {
    throw new Response("Failed to fetch single post", {
      status: res.status,
    });
  }
  return res.json();
}

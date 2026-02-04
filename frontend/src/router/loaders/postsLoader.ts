export async function postsLoader() {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    throw new Response("Failed to fetch posts", {
      status: res.status,
    });
  }
  return res.json();
}

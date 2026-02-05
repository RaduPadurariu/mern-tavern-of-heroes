export async function postsLoader() {
  const res = await fetch(
    "https://mern-tavern-of-heroes.onrender.com/api/posts",
  );

  if (!res.ok) {
    throw new Response("Failed to fetch posts", {
      status: res.status,
    });
  }
  return res.json();
}

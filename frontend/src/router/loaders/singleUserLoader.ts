import type { LoaderFunctionArgs } from "react-router";

export async function singleUserLoader({ params }: LoaderFunctionArgs) {
  const userId = params.id;

  const [userRes, postsRes] = await Promise.all([
    fetch(`https://mern-tavern-of-heroes.onrender.com/api/users/${userId}`),
    fetch(
      `https://mern-tavern-of-heroes.onrender.com/api/posts?user=${userId}`,
    ),
  ]);

  const user = await userRes.json();
  const posts = await postsRes.json();

  return { user, posts };
}

export async function usersLoader() {
  const res = await fetch("/api/users");

  if (!res.ok) {
    throw new Response("Failed to fetch users", {
      status: res.status,
    });
  }

  return res.json();
}

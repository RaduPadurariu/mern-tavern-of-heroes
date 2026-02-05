export async function usersLoader() {
  // const res = await fetch("http://localhost:3000/api/users");
  const res = await fetch(
    "https://mern-tavern-of-heroes.onrender.com/api/users",
  );

  if (!res.ok) {
    throw new Response("Failed to fetch users", {
      status: res.status,
    });
  }

  return res.json();
}

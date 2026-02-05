import { redirect, type ActionFunctionArgs } from "react-router";

export async function registerUserAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const newUser = {
    username,
    email,
    password,
  };

  const res = await fetch(
    "https://mern-tavern-of-heroes.onrender.com/api/auth",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
      credentials: "include",
    },
  );

  if (!res.ok) {
    const errorData = await res.json();

    return {
      status: res.status,
      fieldErrors: errorData.errors, // 👈 pentru Zod
      message: errorData.message, // 👈 pentru auth / server
    };
  }
  return redirect("/account");
}

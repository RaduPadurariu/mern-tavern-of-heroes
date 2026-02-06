import { redirect, type ActionFunctionArgs } from "react-router";
import { API_URL } from "../../config/api";

export async function loginUserAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();

    return {
      status: res.status,
      fieldErrors: errorData.errors, // 👈 pentru Zod
      message: errorData.message, // 👈 pentru auth / server
    };
  }

  return redirect("/");
}

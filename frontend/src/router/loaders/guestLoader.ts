import { redirect } from "react-router";

export async function guestLoader() {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (res.ok) {
    return redirect("/posts");
  }

  return null;
}

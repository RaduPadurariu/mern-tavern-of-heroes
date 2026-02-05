import { redirect, type ActionFunctionArgs } from "react-router";
import type { UpdateUserPayload } from "../../types/types";

export async function editUserAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const nickname = formData.get("nickname")?.toString();
  const genderRaw = formData.get("gender")?.toString();
  const heroClass = formData.get("heroClass")?.toString();

  const updatedUser: UpdateUserPayload = {};

  updatedUser.nickname = nickname?.trim() === "" ? null : nickname;
  updatedUser.heroClass = heroClass?.trim() === "" ? null : heroClass;

  if (genderRaw === "none") {
    updatedUser.gender = null;
  } else if (genderRaw) {
    updatedUser.gender = genderRaw;
  }

  // const res = await fetch(`http://localhost:3000/api/users/me`,
  const res = await fetch(
    `https://mern-tavern-of-heroes.onrender.com/api/users/me`,
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    },
  );

  if (!res.ok) {
    throw new Response("Failed to update profile", {
      status: res.status,
    });
  }

  return redirect("/account");
}

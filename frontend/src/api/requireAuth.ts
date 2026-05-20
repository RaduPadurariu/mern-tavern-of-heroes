import { redirect } from "react-router";
import { fetchMe } from "./fetchMe";
import type { UserType } from "../types/types";

export async function requireAuth(): Promise<UserType> {
  const user = await fetchMe();
  if (!user) throw redirect("/login");
  return user;
}

import { API_URL } from "../config/api";
import type { UserType } from "../types/types";

export async function fetchMe(): Promise<UserType | null> {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

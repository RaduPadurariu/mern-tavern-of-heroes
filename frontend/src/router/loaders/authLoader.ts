import { requireAuth } from "../../api/requireAuth";

export async function authLoader() {
  await requireAuth();
  return null;
}

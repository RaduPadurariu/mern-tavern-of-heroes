import { requireAuth } from "../../api/requireAuth";

export async function editUserLoader() {
  return requireAuth();
}

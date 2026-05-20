import { redirect } from "react-router";
import { fetchMe } from "../../api/fetchMe";

export async function guestLoader() {
  const user = await fetchMe();
  if (user) throw redirect("/posts");
  return null;
}

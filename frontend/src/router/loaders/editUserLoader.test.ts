import { describe, it, expect, vi, afterEach } from "vitest";
import { editUserLoader } from "./editUserLoader";
import { redirect } from "react-router";

const mockUser = {
  _id: "1",
  username: "radutest",
  email: "radu@example.com",
  nickname: "Padu",
  gender: "Male",
  heroClass: "Warrior",
  avatar: "",
};

describe("editUserLoader", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns user when authenticated", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    } as Response);

    const result = await editUserLoader();

    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("redirects to login when user is not authenticated", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    } as Response);

    await expect(editUserLoader()).rejects.toEqual(redirect("/login"));
  });
});

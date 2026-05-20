import { describe, it, expect, vi, afterEach } from "vitest";
import { guestLoader } from "./guestLoader";
import { redirect } from "react-router";

const mockUser = {
  _id: "1",
  username: "radutest",
  email: "radu@example.com",
  nickname: "",
  gender: "",
  heroClass: "",
  avatar: "",
};

describe("guestLoader", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("redirects authenticated users to posts", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    } as Response);

    await expect(guestLoader()).rejects.toEqual(redirect("/posts"));
  });

  it("allows guests to access login/register", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    } as Response);

    const result = await guestLoader();

    expect(result).toBeNull();
  });
});

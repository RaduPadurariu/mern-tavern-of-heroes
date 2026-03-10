import { describe, it, expect, vi, afterEach } from "vitest";
import { authLoader } from "./authLoader";
import { redirect } from "react-router";

describe("authLoader", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("allows access when user is authenticated", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
    } as Response);

    const result = await authLoader();

    expect(result).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("redirects to login when user is not authenticated", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    } as Response);

    await expect(authLoader()).rejects.toEqual(redirect("/login"));
  });
});

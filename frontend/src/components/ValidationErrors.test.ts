import { describe, expect, it } from "vitest";
import { checkRumorContent, checkRumorTitle } from "./ValidationErrors";

// Post
describe("checkRumorTitle", () => {
  it("returns error if the title is empty", () => {
    const result = checkRumorTitle("");

    expect(result).toEqual(["Title is required. "]);
  });

  it("returns error when title contains only spaces", () => {
    const result = checkRumorTitle("    ");

    expect(result).toEqual(["Title is required. "]);
  });

  it("returns empty array when title is valid", () => {
    const result = checkRumorTitle("My first post");

    expect(result).toEqual([]);
  });
});

describe("checkRumorContent", () => {
  it("returns error if the content is empty", () => {
    const result = checkRumorContent("");

    expect(result).toEqual(["Content is required."]);
  });

  it("returns error when content contains only spaces", () => {
    const result = checkRumorContent("    ");

    expect(result).toEqual(["Content is required."]);
  });

  it("returns empty array when username is valid", () => {
    const result = checkRumorContent("My first post");

    expect(result).toEqual([]);
  });
});

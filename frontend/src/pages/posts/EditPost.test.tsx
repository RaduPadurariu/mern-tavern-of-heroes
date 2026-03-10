import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import EditPost from "./EditPost";
import userEvent from "@testing-library/user-event";

function renderEditPost(action?: ActionFunction) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <EditPost />,
      loader: () => ({
        _id: 1,
        title: "Existing title",
        content: "Existing content",
      }),
      action,
    },
    {
      path: "/posts/1",
      element: <div>Post Page</div>,
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe("EditPost", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("render all form components", async () => {
    renderEditPost();

    expect(await screen.findByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("render form pre-filled with data from loader", async () => {
    renderEditPost();
    const titleInput = await screen.findByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);

    expect(titleInput).toHaveValue("Existing title");
    expect(contentInput).toHaveValue("Existing content");
  });

  it("shows validation errors when submit with empty fields", async () => {
    renderEditPost();

    const titleInput = await screen.findByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);

    await userEvent.clear(titleInput);
    await userEvent.clear(contentInput);

    await userEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Content is required/i)).toBeInTheDocument();
  });

  it("does not submit form when validation fails", async () => {
    const actionMock = vi.fn(async () => null);
    renderEditPost(actionMock);

    const titleInput = await screen.findByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);

    await userEvent.clear(titleInput);
    await userEvent.clear(contentInput);

    await userEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(actionMock).not.toHaveBeenCalled();
  });

  it("submit form when fields are valid", async () => {
    const actionMock = vi.fn(async () => null);
    renderEditPost(actionMock);

    const titleInput = await screen.findByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "modified");

    await userEvent.clear(contentInput);
    await userEvent.type(contentInput, "modified");

    await userEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(actionMock).toHaveBeenCalled();
  });

  it("navigates when user confirms discard changes", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(true);

    renderEditPost();

    const titleInput = await screen.findByLabelText(/Title/i);

    await user.type(titleInput, " modified");

    await user.click(screen.getByRole("link", { name: /Cancel/i }));

    expect(screen.getByText("Post Page")).toBeInTheDocument();
  });

  it("does not navigate when user cancels discard changes", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(false);

    renderEditPost();

    const titleInput = await screen.findByLabelText(/Title/i);

    await user.type(titleInput, " modified");

    await user.click(screen.getByRole("link", { name: /Cancel/i }));

    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });
});

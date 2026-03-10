import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewPost from "./NewPost";
import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";

function renderNewPost(action?: ActionFunction) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <NewPost />,
      action,
    },
    {
      path: "/posts",
      element: <div>Post Page</div>,
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe("NewPost", () => {
  it("render all form components", () => {
    renderNewPost();

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Post/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("shows validation errors when submit with empty fields", () => {
    renderNewPost();

    fireEvent.click(screen.getByRole("button", { name: /Post/i }));
    expect(screen.getByText(/Title is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Content is required./i)).toBeInTheDocument();
  });

  it("does not submit form when validation fails", () => {
    const actionMock = vi.fn();
    renderNewPost(actionMock);

    fireEvent.click(screen.getByRole("button", { name: /Post/i }));

    expect(actionMock).not.toHaveBeenCalled();
  });

  it("submit form when fields are valid", async () => {
    const actionMock = vi.fn(async () => null);
    renderNewPost(actionMock);

    await userEvent.type(screen.getByLabelText(/Title/i), "My first post");
    await userEvent.type(screen.getByLabelText(/Content/i), "Lorem ipsum");
    await userEvent.click(screen.getByRole("button", { name: /Post/i }));

    expect(actionMock).toHaveBeenCalled();
  });

  it("navigates to post page when cancel is clicked", async () => {
    renderNewPost();

    await userEvent.click(screen.getByRole("link", { name: /Cancel/i }));

    expect(screen.getByText(/Post Page/i)).toBeInTheDocument();
  });
});

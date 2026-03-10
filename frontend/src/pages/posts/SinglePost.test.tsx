import { afterEach, describe, expect, it, vi } from "vitest";
import SinglePost from "./SinglePost";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import userEvent from "@testing-library/user-event";

const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

vi.mock("../../components/Breadcrumbs/Breadcrumbs", () => ({
  default: () => <div>Breadcrumbs</div>,
}));

vi.mock("../../components/Posts/PostHeader", () => ({
  default: () => <div>PostHeader</div>,
}));

vi.mock("../../components/Posts/PostReaction", () => ({
  default: () => <div>PostReaction</div>,
}));

function renderSinglePost(action?: ActionFunction) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <SinglePost />,
      loader: () => ({
        _id: 1,
        title: "My first post",
        content: "This is a post on a single page",
        user: { _id: 123 },
      }),
      action,
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe("SinglePost tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("render post data", async () => {
    mockUseTavernContext.mockReturnValue({ user: null });
    renderSinglePost();

    expect(await screen.findByText(/My first post/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/This is a post on a single page/i),
    ).toBeInTheDocument();
  });

  it("it hides edit and delete buttons when no user is logged in", async () => {
    mockUseTavernContext.mockReturnValue({ user: null });
    renderSinglePost();

    expect(
      screen.queryByRole("link", { name: /Edit/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Delete/i }),
    ).not.toBeInTheDocument();
  });

  it("it hides edit and delete buttons when the logged user is not the author", async () => {
    mockUseTavernContext.mockReturnValue({
      user: { _id: 999 },
    });
    renderSinglePost();
    await screen.findByText(/My first post/i);

    expect(
      screen.queryByRole("link", { name: /Edit/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Delete/i }),
    ).not.toBeInTheDocument();
  });

  it("it shows edit and delete buttons when the logged user is the post author", async () => {
    mockUseTavernContext.mockReturnValue({
      user: { _id: 123 },
    });
    renderSinglePost();

    expect(
      await screen.findByRole("link", { name: /Edit/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  it("it prevents delete when confirmation is cancelled", async () => {
    const actionMock = vi.fn(async () => null);
    mockUseTavernContext.mockReturnValue({
      user: { _id: 123 },
    });
    vi.spyOn(window, "confirm").mockReturnValue(false);
    renderSinglePost(actionMock);

    await userEvent.click(
      await screen.findByRole("button", { name: /Delete/i }),
    );
    expect(actionMock).not.toHaveBeenCalled();
  });

  it("it deletes the post when confirmation is accepted", async () => {
    const actionMock = vi.fn(async () => null);
    mockUseTavernContext.mockReturnValue({
      user: { _id: 123 },
    });
    vi.spyOn(window, "confirm").mockReturnValue(true);
    renderSinglePost(actionMock);

    await userEvent.click(
      await screen.findByRole("button", { name: /Delete/i }),
    );
    expect(actionMock).toHaveBeenCalledTimes(1);
  });
});

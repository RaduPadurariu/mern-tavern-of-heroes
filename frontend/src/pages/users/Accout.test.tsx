import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import { describe, expect, it, vi } from "vitest";
import Account from "./Account";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

function renderAccount(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Account />,
        action,
      },
      {
        path: "/account/edit-profile",
        element: <div>Edit Page</div>,
      },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("delete account", () => {
  it("renders delete account button", () => {
    mockUseTavernContext.mockReturnValue({
      user: { username: "Radu" },
    });

    renderAccount();

    expect(
      screen.getByRole("button", { name: /Delete Account/i }),
    ).toBeInTheDocument();
  });

  it("submits delete account form", async () => {
    const user = userEvent.setup();

    mockUseTavernContext.mockReturnValue({
      user: { username: "Radu" },
    });

    const actionMock = vi.fn(async () => null);

    renderAccount(actionMock);

    await user.click(screen.getByRole("button", { name: /Delete Account/i }));

    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  it("navigates to edit profile page", async () => {
    const user = userEvent.setup();

    mockUseTavernContext.mockReturnValue({
      user: { username: "Radu" },
    });

    renderAccount();

    await user.click(screen.getByRole("link", { name: /Edit Profile/i }));

    expect(await screen.findByText("Edit Page")).toBeInTheDocument();
  });
});

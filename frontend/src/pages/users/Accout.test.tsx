import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Account from "./Account";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockSetUser = vi.fn();
const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

function renderAccount(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/account",
        element: <Account />,
        action,
      },
      {
        path: "/account/edit-profile",
        element: <div>Edit Page</div>,
      },
      {
        path: "/login",
        element: <div>Login Page</div>,
      },
    ],
    { initialEntries: ["/account"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("delete account", () => {
  beforeEach(() => {
    mockUseTavernContext.mockReturnValue({
      user: { username: "Radu" },
      setUser: mockSetUser,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders delete account button", () => {
    renderAccount();

    expect(
      screen.getByRole("button", { name: /Delete Account/i }),
    ).toBeInTheDocument();
  });

  it("submits delete account form", async () => {
    const actionMock = vi.fn(async () => null);

    renderAccount(actionMock);

    await userEvent.click(screen.getByRole("button", { name: /Delete Account/i }));

    expect(actionMock).toHaveBeenCalledTimes(1);
    expect(mockSetUser).not.toHaveBeenCalled();
  });

  it("clears user and navigates to login after successful delete", async () => {
    const actionMock: ActionFunction = async () => ({ ok: true });

    renderAccount(actionMock);

    await userEvent.click(screen.getByRole("button", { name: /Delete Account/i }));

    await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith(null));
    expect(await screen.findByText(/Login Page/i)).toBeInTheDocument();
  });

  it("navigates to edit profile page", async () => {
    renderAccount();

    await userEvent.click(screen.getByRole("link", { name: /Edit Profile/i }));

    expect(await screen.findByText("Edit Page")).toBeInTheDocument();
  });
});

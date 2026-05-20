import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";
import { render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import userEvent from "@testing-library/user-event";

const mockSetUser = vi.fn();
const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

function renderNavbar(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <>
            <Navbar />
            <div>Home Page</div>
          </>
        ),
        action,
      },
    ],
    {
      initialEntries: ["/"],
    },
  );

  return render(<RouterProvider router={router} />);
}

describe("TavernNavbar - authentication state rendering", () => {
  beforeEach(() => {
    mockUseTavernContext.mockReturnValue({
      user: null,
      isLoading: false,
      setUser: mockSetUser,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows Sign up and Log in when user is not authenticated", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /Sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Log in/i })).toBeInTheDocument();
  });

  it("shows auth skeleton while loading and hides auth links", () => {
    mockUseTavernContext.mockReturnValue({
      user: null,
      isLoading: true,
      setUser: mockSetUser,
    });

    renderNavbar();

    expect(
      screen.getByRole("status", { name: /Loading authentication/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Sign up/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Log in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Profile/i })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Log out/i }),
    ).not.toBeInTheDocument();
  });

  it("shows Profile and Log out when user is authenticated", () => {
    mockUseTavernContext.mockReturnValue({
      user: { _id: "123", username: "Radu" },
      isLoading: false,
      setUser: mockSetUser,
    });
    renderNavbar();

    expect(screen.getByRole("link", { name: /Profile/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Log out/i }),
    ).toBeInTheDocument();
  });

  it("submits logout without clearing user when action does not return ok", async () => {
    mockUseTavernContext.mockReturnValue({
      user: { _id: "123", username: "Radu" },
      isLoading: false,
      setUser: mockSetUser,
    });

    const actionMock = vi.fn(async () => null);

    renderNavbar(actionMock);

    await userEvent.click(screen.getByRole("button", { name: /Log out/i }));

    expect(actionMock).toHaveBeenCalledTimes(1);
    expect(mockSetUser).not.toHaveBeenCalled();
  });

  it("clears user after successful logout", async () => {
    mockUseTavernContext.mockReturnValue({
      user: { _id: "123", username: "Radu" },
      isLoading: false,
      setUser: mockSetUser,
    });

    const actionMock: ActionFunction = async () => ({ ok: true });

    renderNavbar(actionMock);

    await userEvent.click(screen.getByRole("button", { name: /Log out/i }));

    await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith(null));
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  it("handles double logout without clearing user with invalid values", async () => {
    const user = userEvent.setup();

    mockUseTavernContext.mockReturnValue({
      user: { _id: "123", username: "Radu" },
      isLoading: false,
      setUser: mockSetUser,
    });

    const actionMock = vi.fn(async () => ({ ok: true }));

    renderNavbar(actionMock);

    await user.dblClick(screen.getByRole("button", { name: /Log out/i }));

    await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith(null));
    expect(mockSetUser.mock.calls.every(([value]) => value === null)).toBe(true);
    expect(actionMock).toHaveBeenCalled();
  });
});

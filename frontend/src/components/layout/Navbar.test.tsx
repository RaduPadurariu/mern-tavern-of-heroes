import { afterEach, describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  redirect,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import userEvent from "@testing-library/user-event";

const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

function renderNavbar(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Navbar />,
        action,
      },

      { path: "/dashboard", element: <div>Dashboard Page</div> },
    ],

    {
      initialEntries: ["/"],
    },
  );

  return render(<RouterProvider router={router} />);
}

describe("TavernNavbar - authentication state rendering", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("shows Sign up and Log in when user is not authenticated", () => {
    mockUseTavernContext.mockReturnValue({ user: null });
    renderNavbar();

    expect(screen.getByRole("link", { name: /Sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Log in/i })).toBeInTheDocument();
  });

  it("shows Profile and Log out when user is authenticated", () => {
    mockUseTavernContext.mockReturnValue({
      user: { _id: "123", username: "Radu" },
    });
    renderNavbar();

    expect(screen.getByRole("link", { name: /Profile/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Log out/i }),
    ).toBeInTheDocument();
  });

  it("logout successfully and redirects to dashboard", async () => {
    mockUseTavernContext.mockReturnValue({
      user: { _id: "123", username: "Radu" },
    });

    const actionMock: ActionFunction = async () => {
      return redirect("/dashboard");
    };

    renderNavbar(actionMock);

    await userEvent.click(screen.getByRole("button", { name: /Log out/i }));
    expect(await screen.findByText(/Dashboard Page/i)).toBeInTheDocument();
  });
});

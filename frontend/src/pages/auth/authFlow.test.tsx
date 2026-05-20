import { useCallback, useState } from "react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../../components/layout/Navbar";
import LogInForm from "./LogInForm";
import { TavernContext } from "../../context/TavernContext";
import type { UserType } from "../../types/types";

const mockUser: UserType = {
  _id: "1",
  username: "radutest",
  email: "radu@example.com",
  nickname: "",
  gender: "",
  heroClass: "",
  avatar: "",
};

function TestAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  const refetchUser = useCallback(async () => {
    setUser(mockUser);
    return mockUser;
  }, []);

  return (
    <TavernContext.Provider
      value={{
        user,
        setUser,
        isLoading: false,
        refetchUser,
      }}
    >
      {children}
    </TavernContext.Provider>
  );
}

function renderAuthFlow(
  loginAction: ActionFunction = async () => ({ ok: true }),
  logoutAction: ActionFunction = async () => ({ ok: true }),
) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <TestAuthProvider>
            <Navbar />
            <Outlet />
          </TestAuthProvider>
        ),
        action: logoutAction,
        children: [
          { index: true, element: <div>Home Page</div> },
          { path: "posts", element: <div>Posts Page</div> },
          { path: "login", element: <LogInForm />, action: loginAction },
        ],
      },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("auth flow", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("login, logout, then login again updates navbar auth state", async () => {
    const user = userEvent.setup();

    renderAuthFlow();

    expect(screen.getByRole("link", { name: /Log in/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Profile/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Log in/i }));
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await user.type(screen.getByLabelText(/^Password$/i), "Password1");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() =>
      expect(screen.getByRole("link", { name: /Profile/i })).toBeInTheDocument(),
    );
    expect(
      screen.queryByRole("link", { name: /Log in/i }),
    ).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/Posts Page/i)).toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: /Log out/i }));

    await waitFor(() =>
      expect(screen.getByRole("link", { name: /Log in/i })).toBeInTheDocument(),
    );
    expect(
      screen.queryByRole("link", { name: /Profile/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Log in/i }));
    await user.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await user.type(screen.getByLabelText(/^Password$/i), "Password1");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() =>
      expect(screen.getByRole("link", { name: /Profile/i })).toBeInTheDocument(),
    );
    expect(
      screen.queryByRole("link", { name: /Log in/i }),
    ).not.toBeInTheDocument();
  });
});

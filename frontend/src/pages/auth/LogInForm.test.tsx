import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LogInForm from "./LogInForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockRefetchUser = vi.fn();
const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

function renderLogIn(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
      {
        path: "/posts",
        element: <div>Posts Page</div>,
      },
      {
        path: "/login",
        element: <LogInForm />,
        action,
      },
    ],
    {
      initialEntries: ["/login"],
    },
  );

  return render(<RouterProvider router={router} />);
}

describe("LogIn Form", () => {
  beforeEach(() => {
    mockRefetchUser.mockResolvedValue(null);
    mockUseTavernContext.mockReturnValue({
      refetchUser: mockRefetchUser,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("render all form components", () => {
    renderLogIn();

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submit with empty fields", async () => {
    renderLogIn();

    await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
  });

  it("shows validation error on email invalid", async () => {
    renderLogIn();
    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example");
    await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));
    expect(
      screen.getByText(/Please enter a valid email address./i),
    ).toBeInTheDocument();
  });

  it("shows validation error when credentials are invalid", async () => {
    const actionMock: ActionFunction = async () => ({
      fieldErrors: {
        email: ["Invalid email or password"],
      },
    });

    renderLogIn(actionMock);

    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "Password1");
    await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(
      await screen.findByText(/Invalid email or password/i),
    ).toBeInTheDocument();
    expect(mockRefetchUser).not.toHaveBeenCalled();
  });

  it("submits successfully, refetches user and navigates home", async () => {
    const actionMock: ActionFunction = async () => ({ ok: true });
    mockRefetchUser.mockResolvedValue({
      _id: "1",
      username: "radutest",
      email: "radu@example.com",
      nickname: "",
      gender: "",
      heroClass: "",
      avatar: "",
    });

    renderLogIn(actionMock);

    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password1");
    await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => expect(mockRefetchUser).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Posts Page/i)).toBeInTheDocument();
  });
});

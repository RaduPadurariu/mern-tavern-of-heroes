import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SignUpForm from "./SignUpForm";
import { render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import userEvent from "@testing-library/user-event";

const mockRefetchUser = vi.fn();
const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

function renderSignUp(action?: ActionFunction) {
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
        path: "/register",
        element: <SignUpForm />,
        action,
      },
    ],
    {
      initialEntries: ["/register"],
    },
  );

  return render(<RouterProvider router={router} />);
}

describe("Register Form", () => {
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
    renderSignUp();

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submit with empty fields", async () => {
    renderSignUp();

    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(screen.getByText(/Username is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
  });

  it("shows validation error on email invalid", async () => {
    renderSignUp();

    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example");

    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(
      screen.getByText(/Please enter a valid email address./i),
    ).toBeInTheDocument();
  });

  it("shows validation error when password is invalid", async () => {
    renderSignUp();

    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password");
    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
    expect(
      screen.getByText(
        /At least 8 characters, with uppercase, lowercase and a number./i,
      ),
    ).toBeInTheDocument();
  });

  it("shows validation error when passwords do not match", async () => {
    renderSignUp();

    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password1");
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "Password2",
    );
    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/Confirm Password/i));
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "Password1",
    );
    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
    expect(
      screen.queryByText(/Passwords do not match/i),
    ).not.toBeInTheDocument();
  });

  it("shows validation error when user username exists", async () => {
    const actionMock: ActionFunction = async () => ({
      fieldErrors: {
        username: ["Username already exists"],
      },
    });
    renderSignUp(actionMock);

    await userEvent.type(screen.getByLabelText(/Username/i), "radutest");
    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password1");
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "Password1",
    );
    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(
      await screen.findByText(/Username already exists/i),
    ).toBeInTheDocument();
    expect(mockRefetchUser).not.toHaveBeenCalled();
  });

  it("shows validation error when user email exists", async () => {
    const actionMock: ActionFunction = async () => ({
      fieldErrors: {
        email: ["Email already exists"],
      },
    });
    renderSignUp(actionMock);

    await userEvent.type(screen.getByLabelText(/Username/i), "radutest");
    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password1");
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "Password1",
    );
    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(
      await screen.findByText(/Email already exists/i),
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
    renderSignUp(actionMock);

    await userEvent.type(screen.getByLabelText(/Username/i), "radutest");
    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password1");
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "Password1",
    );
    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => expect(mockRefetchUser).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Posts Page/i)).toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";
import SignUpForm from "./SignUpForm";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  redirect,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import userEvent from "@testing-library/user-event";

function renderSignUp(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <SignUpForm />,
        action,
      },
      {
        path: "/dashboard",
        element: <div>Dashboard Page</div>,
      },
    ],
    {
      initialEntries: ["/"],
    },
  );

  return render(<RouterProvider router={router} />);
}

describe("Register Form", () => {
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

  it("shows validation errors when submit with empty fields", () => {
    renderSignUp();
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
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
  });

  it("submits successfully and redirects to dashboard", async () => {
    const actionMock: ActionFunction = async () => {
      return redirect("/dashboard");
    };
    renderSignUp(actionMock);

    await userEvent.type(screen.getByLabelText(/Username/i), "radutest");
    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password1");
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "Password1",
    );
    await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
    expect(await screen.findByText(/Dashboard Page/i)).toBeInTheDocument();
  });
});

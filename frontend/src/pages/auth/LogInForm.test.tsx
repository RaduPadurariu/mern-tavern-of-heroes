import {
  createMemoryRouter,
  redirect,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import { describe, expect, it } from "vitest";
import LogInForm from "./LogInForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function renderLogIn(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <LogInForm />,
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

describe("LogIn", () => {
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
  });

  it("submits successfully and redirects to dashboard", async () => {
    const actionMock: ActionFunction = async () => {
      return redirect("/dashboard");
    };
    renderLogIn(actionMock);

    await userEvent.type(screen.getByLabelText(/Email/i), "radu@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Password1");

    await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));
    expect(await screen.findByText(/Dashboard Page/i)).toBeInTheDocument();
  });
});

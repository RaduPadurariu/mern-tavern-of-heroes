import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EditProfileForm from "./EditProfileForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

const mockUser = {
  _id: "123",
  username: "Radu",
  email: "radu@test.com",
  nickname: "Padu",
  gender: "Male",
  heroClass: "Warrior",
  avatar: "",
};

function renderEditProfile(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        id: "account",
        path: "/account",
        loader: async () => mockUser,
        children: [
          {
            index: true,
            element: <div>User Page</div>,
          },
          {
            path: "edit-profile",
            element: <EditProfileForm />,
            action,
          },
        ],
      },
      {
        path: "/login",
        element: <div>Login Page</div>,
      },
    ],
    { initialEntries: ["/account/edit-profile"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("Edit Profile", () => {
  beforeEach(() => {
    mockUseTavernContext.mockReturnValue({
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("render all form components", async () => {
    renderEditProfile();
    expect(await screen.findByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nickname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hero Class/i)).toBeInTheDocument();
  });

  it("test if email and username inputs are disabled", async () => {
    renderEditProfile();

    expect(await screen.findByLabelText(/Username/i)).toBeDisabled();
    expect(screen.getByLabelText(/Email/i)).toBeDisabled();
  });

  it("render form pre-filled with data from loader", async () => {
    renderEditProfile();

    const nicknameInput = await screen.findByLabelText(/Nickname/i);
    const genderInput = screen.getByLabelText(/Gender/i);
    const heroClassInput = screen.getByLabelText(/Hero Class/i);

    await waitFor(() => expect(nicknameInput).toHaveValue("Padu"));
    expect(genderInput).toHaveValue("Male");
    expect(heroClassInput).toHaveValue("Warrior");
  });

  it("submit form when fields are valid", async () => {
    const actionMock = vi.fn(async () => null);

    renderEditProfile(actionMock);

    const nicknameInput = await screen.findByLabelText(/Nickname/i);
    const genderInput = screen.getByLabelText(/Gender/i);
    const heroClassInput = screen.getByLabelText(/Hero Class/i);

    await userEvent.clear(nicknameInput);
    await userEvent.type(nicknameInput, "Ionela");

    await userEvent.selectOptions(genderInput, "Female");

    await userEvent.clear(heroClassInput);
    await userEvent.type(heroClassInput, "Mage");

    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  it("navigates when user confirms discard changes", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(true);

    renderEditProfile();

    const nicknameInput = await screen.findByLabelText(/Nickname/i);

    await user.type(nicknameInput, " modified");

    await user.click(screen.getByRole("link", { name: /Go Back/i }));

    expect(await screen.findByText("User Page")).toBeInTheDocument();
  });

  it("does not navigate when user cancels discard changes", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(false);

    renderEditProfile();

    const nicknameInput = await screen.findByLabelText(/Nickname/i);

    await user.type(nicknameInput, " modified");

    await user.click(screen.getByRole("link", { name: /Go back/i }));

    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("navigates back without confirmation when no changes were made", async () => {
    const user = userEvent.setup();

    const confirmSpy = vi.spyOn(window, "confirm");

    renderEditProfile();

    await screen.findByLabelText(/Nickname/i);
    await user.click(screen.getByRole("link", { name: /Go Back/i }));

    expect(confirmSpy).not.toHaveBeenCalled();

    expect(await screen.findByText("User Page")).toBeInTheDocument();
  });
});

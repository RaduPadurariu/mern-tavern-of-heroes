import {
  createMemoryRouter,
  RouterProvider,
  type ActionFunction,
} from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import EditProfileForm from "./EditProfileForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockUseTavernContext = vi.fn();

vi.mock("../../context/useContext", () => ({
  useTavernContext: () => mockUseTavernContext(),
}));

function renderEditProfile(action?: ActionFunction) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <EditProfileForm />,
        action,
      },
      {
        path: "/account",
        element: <div>User Page</div>,
      },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("Edit Profile", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("render all form components", () => {
    mockUseTavernContext.mockReturnValue({
      user: {
        _id: 123,
        username: "Radu",
        email: "radu@test.com",
        nickname: "",
        gender: "",
        heroClass: "",
      },
      isLoading: false,
    });
    renderEditProfile();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nickname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hero Class/i)).toBeInTheDocument();
  });

  it("test if email and username inputs are disabled", () => {
    mockUseTavernContext.mockReturnValue({
      user: {
        _id: 123,
        username: "Radu",
        email: "radu@test.com",
        nickname: "",
        gender: "",
        heroClass: "",
      },
      isLoading: false,
    });
    renderEditProfile();

    expect(screen.getByLabelText(/Username/i)).toBeDisabled();
    expect(screen.getByLabelText(/Email/i)).toBeDisabled();
  });

  it("render form pre-filled with data from loader", async () => {
    mockUseTavernContext.mockReturnValue({
      user: {
        _id: 123,
        username: "Radu",
        email: "radu@test.com",
        nickname: "Padu",
        gender: "Male",
        heroClass: "Warrior",
      },
      isLoading: false,
    });

    renderEditProfile();

    const nicknameInput = await screen.findByLabelText(/Nickname/i);
    const genderInput = screen.getByLabelText(/Gender/i);
    const heroClassInput = screen.getByLabelText(/Hero Class/i);

    expect(nicknameInput).toHaveValue("Padu");
    expect(genderInput).toHaveValue("Male");
    expect(heroClassInput).toHaveValue("Warrior");
  });

  it("submit form when fields are valid", async () => {
    mockUseTavernContext.mockReturnValue({
      user: {
        _id: 123,
        username: "Radu",
        email: "radu@test.com",
        nickname: "Padu",
        gender: "Male",
        heroClass: "Warrior",
      },
      isLoading: false,
    });

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

    await user.click(screen.getByRole("link", { name: /Go Back/i }));

    expect(confirmSpy).not.toHaveBeenCalled();

    expect(await screen.findByText("User Page")).toBeInTheDocument();
  });
});

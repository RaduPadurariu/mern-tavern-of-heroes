import { Form, useActionData } from "react-router";
import { useRegisterReducer } from "../../hooks/useRegisterReducer";
import {
  checkConfirmPasswordSignUp,
  checkEmailSignUp,
  checkPasswordSignUp,
  checkUsernameSignUp,
} from "../../components/ValidationErrors";

const SignUpForm = () => {
  const { state, dispatch } = useRegisterReducer();
  const actionData = useActionData() as {
    fieldErrors?: {
      email?: string[];
      password?: string[];
      username: string[];
    };
    message?: string;
    status?: number;
  };

  const usernameErrors = state.isAfterSubmit
    ? checkUsernameSignUp(state.username)
    : [];
  const emailErrors = state.isAfterSubmit ? checkEmailSignUp(state.email) : [];
  const passwordErrors = state.isAfterSubmit
    ? checkPasswordSignUp(state.password)
    : [];

  const confirmPasswordErrors = state.isAfterSubmit
    ? checkConfirmPasswordSignUp(state.password, state.confirmPassword)
    : [];

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch({ type: "IS_AFTER_SUBMIT", payload: true });

    const usernameErrors = checkUsernameSignUp(state.username);
    const emailErrors = checkEmailSignUp(state.email);
    const passwordErrors = checkPasswordSignUp(state.password);
    const confirmPasswordErrors = checkConfirmPasswordSignUp(
      state.password,
      state.confirmPassword,
    );

    if (
      usernameErrors.length > 0 ||
      emailErrors.length > 0 ||
      passwordErrors.length > 0 ||
      confirmPasswordErrors.length > 0
    ) {
      e.preventDefault();
      return;
    }
    dispatch({ type: "IS_AFTER_SUBMIT", payload: false });
  };
  return (
    <Form className="" onSubmit={(e) => registerHandler(e)} method="post">
      <div className="mt-5">
        <label htmlFor="tavernSignUpUsername" className="sr-only">
          Username
        </label>
        <input
          id="tavernSignUpUsername"
          type="text"
          placeholder="Username"
          name="username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "SET_USERNAME", payload: e.target.value })
          }
          className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
        />
        <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
          {usernameErrors.map((err, i) => (
            <span key={i}>{err}</span>
          ))}
          {!usernameErrors[0] && actionData?.fieldErrors?.username?.[0] && (
            <span>{actionData.fieldErrors.username[0]}</span>
          )}
        </div>
      </div>
      <div className="mb-1">
        <label htmlFor="tavernSignUpEmail" className="sr-only">
          Email
        </label>
        <input
          id="tavernSignUpEmail"
          type="email"
          placeholder="Email Address"
          name="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
        />
        <small className="form-text">
          Profile image is fetched automatically via Gravatar.
        </small>
        <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
          {emailErrors.map((err, i) => (
            <span key={i}>{err}</span>
          ))}
          {!emailErrors[0] && actionData?.fieldErrors?.email?.[0] && (
            <span>{actionData.fieldErrors.email[0]}</span>
          )}
        </div>
      </div>
      <div className="mb-1">
        <label htmlFor="tavernSignUpPassword" className="sr-only">
          Password
        </label>
        <input
          id="tavernSignUpPassword"
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"

          // minLength="6"
          // autoComplete="on"
        />
        <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
          {passwordErrors.map((err, i) => (
            <span key={i}>{err}</span>
          ))}
          {!passwordErrors[0] && actionData?.fieldErrors?.password?.[0] && (
            <span>{actionData.fieldErrors.password[0]}</span>
          )}
          {!passwordErrors[0] &&
            !actionData?.fieldErrors?.password &&
            actionData?.message && <span>{actionData.message}</span>}
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="tavernSignUpConfirmPassword" className="sr-only">
          Confirm Password
        </label>
        <input
          id="tavernSignUpConfirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={(e) =>
            dispatch({
              type: "SET_CONFIRM_PASSWORD",
              payload: e.target.value,
            })
          }
          name="confirmationPassword"
          className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
          // minLength="6"
          // autoComplete="on"
        />
        <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
          {confirmPasswordErrors.length > 0 &&
            confirmPasswordErrors.map((err, i) => <span key={i}>{err}</span>)}
        </div>
      </div>
      <button
        type="submit"
        className="text-(--light-color) bg-(--primary-color) text-xl py-1.5 px-5 border rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
      >
        Sign Up
      </button>
    </Form>
  );
};

export default SignUpForm;

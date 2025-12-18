import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import HeadTitle from "../components/HeadTitle";
import { useRegisterReducer } from "../hooks/useRegisterReducer";
import {
  checkConfirmPasswordSignUp,
  checkEmailSignUp,
  checkNameSignUp,
  checkPasswordSignUp,
} from "../components/ValidationErrors";

const SignUp = () => {
  const { state, dispatch } = useRegisterReducer();

  const nameErrors = state.isAfterSubmit ? checkNameSignUp(state.name) : [];
  const emailErrors = state.isAfterSubmit ? checkEmailSignUp(state.email) : [];
  const passwordErrors = state.isAfterSubmit
    ? checkPasswordSignUp(state.password)
    : [];

  const confirmPasswordErrors = state.isAfterSubmit
    ? checkConfirmPasswordSignUp(state.password, state.confirmPassword)
    : [];

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "IS_AFTER_SUBMIT", payload: true });

    const nameErrors = checkNameSignUp(state.name);
    const emailErrors = checkEmailSignUp(state.email);
    const passwordErrors = checkPasswordSignUp(state.password);
    const confirmPasswordErrors = checkConfirmPasswordSignUp(
      state.password,
      state.confirmPassword
    );

    if (
      nameErrors.length > 0 ||
      emailErrors.length > 0 ||
      passwordErrors.length > 0 ||
      confirmPasswordErrors.length > 0
    ) {
      return;
    }

    dispatch({ type: "SET_NAME", payload: "" });
    dispatch({ type: "SET_EMAIL", payload: "" });
    dispatch({ type: "SET_PASSWORD", payload: "" });
    dispatch({ type: "SET_CONFIRM_PASSWORD", payload: "" });
    dispatch({ type: "IS_AFTER_SUBMIT", payload: false });
  };
  return (
    <div className="tavern-container">
      <HeadTitle title="Join the Tavern" />

      <div className="py-6 px-12">
        <p className="text-2xl my-4 flex">
          <FaUserAlt /> <span className="ml-2">Create your account</span>
        </p>
        <form className="" onSubmit={(e) => registerHandler(e)}>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={state.name}
              onChange={(e) =>
                dispatch({ type: "SET_NAME", payload: e.target.value })
              }
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              required
            />
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
              {nameErrors.length > 0 &&
                nameErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>
          <div className="mb-1">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              required
            />
            <small className="form-text">
              Profile image is fetched automatically via Gravatar.
            </small>
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
              {emailErrors.length > 0 &&
                emailErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>
          <div className="mb-1">
            <input
              type="password"
              placeholder="Password"
              required
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
              {passwordErrors.length > 0 &&
                passwordErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "SET_CONFIRM_PASSWORD",
                  payload: e.target.value,
                })
              }
              required
              name="confirmationPassword"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              // minLength="6"
              // autoComplete="on"
            />
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
              {confirmPasswordErrors.length > 0 &&
                confirmPasswordErrors.map((err, i) => (
                  <span key={i}>{err}</span>
                ))}
            </div>
          </div>
          <button
            type="submit"
            className="text-(--light-color) bg-(--primary-color) text-xl py-1.5 px-5 border rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
          >
            Sign Up
          </button>
        </form>
        <p className="my-4">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

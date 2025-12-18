import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import HeadTitle from "../components/HeadTitle";
import { useLoginReducer } from "../hooks/useLoginReducer";
import {
  checkEmailSignIn,
  checkPasswordSignIn,
} from "../components/ValidationErrors";

const LogIn = () => {
  const { state, dispatch } = useLoginReducer();

  const emailErrors = state.isAfterSubmit ? checkEmailSignIn(state.email) : [];
  const passwordErrors = state.isAfterSubmit
    ? checkPasswordSignIn(state.password)
    : [];
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "IS_AFTER_SUBMIT", payload: true });

    const emailErrors = checkEmailSignIn(state.email);
    const passwordErrors = checkPasswordSignIn(state.password);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      return;
    }
    dispatch({ type: "SET_EMAIL", payload: "" });
    dispatch({ type: "SET_PASSWORD", payload: "" });
    dispatch({ type: "IS_AFTER_SUBMIT", payload: false });
  };
  return (
    <div className="tavern-container">
      <HeadTitle title="Enter the Tavern" />
      <div className="py-6 px-12">
        <p className="text-2xl my-4 flex ">
          <FaUserAlt /> <span className="ml-2">Sign in to your account</span>
        </p>
        <form className="" onSubmit={(e) => submitHandler(e)}>
          <div className="mt-5">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              autoComplete="on"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
              {emailErrors.length > 0 &&
                emailErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>
          <div className="mb-1">
            <input
              type="password"
              value={state.password}
              required
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              placeholder="Password"
              name="password"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
            <div className="text-sm mt-0.5 text-red-700 ml-1 min-h-5">
              {passwordErrors.length > 0 &&
                passwordErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>
          <button
            type="submit"
            className="text-(--light-color) bg-(--primary-color) text-xl py-1.5 px-5 border rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
          >
            Sign In
          </button>
        </form>
        <p className="my-4">
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default LogIn;

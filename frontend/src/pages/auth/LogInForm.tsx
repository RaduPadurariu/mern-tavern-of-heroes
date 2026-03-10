import { Form, useActionData } from "react-router";
import { useLoginReducer } from "../../hooks/useLoginReducer";
import {
  checkEmailSignIn,
  checkPasswordSignIn,
} from "../../components/ValidationErrors";

const LogInForm = () => {
  const { state, dispatch } = useLoginReducer();
  const actionData = useActionData() as {
    fieldErrors?: {
      email?: string[];
      password?: string[];
    };
    message?: string;
    status?: number;
  };

  const emailErrors = state.isAfterSubmit ? checkEmailSignIn(state.email) : [];
  const passwordErrors = state.isAfterSubmit
    ? checkPasswordSignIn(state.password)
    : [];

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch({ type: "IS_AFTER_SUBMIT", payload: true });

    const emailErrors = checkEmailSignIn(state.email);
    const passwordErrors = checkPasswordSignIn(state.password);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      e.preventDefault();
      return;
    }
  };
  return (
    <Form className="" onSubmit={(e) => submitHandler(e)} method="post">
      <div className="mt-5">
        <label htmlFor="tavernLoginEmail" className="sr-only">
          Email
        </label>
        <input
          id="tavernLoginEmail"
          type="email"
          placeholder="Email Address"
          name="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          autoComplete="on"
          className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
        />
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
        <label htmlFor="tavernLoginPassword" className="sr-only">
          Password
        </label>
        <input
          id="tavernLoginPassword"
          type="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          placeholder="Password"
          name="password"
          className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
        />
        <div className="text-sm mt-0.5 text-red-700 ml-1 min-h-5">
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
      <button
        type="submit"
        className="text-(--light-color) bg-(--primary-color) text-xl py-1.5 px-5 border rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
      >
        Sign In
      </button>
    </Form>
  );
};

export default LogInForm;

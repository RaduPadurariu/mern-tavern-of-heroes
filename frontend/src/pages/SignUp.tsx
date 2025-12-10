import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import HeadTitle from "../components/HeadTitle";

const SignUp = () => {
  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="tavern-container">
      <HeadTitle title="Join the Tavern" />

      <div className="py-6 px-12">
        <p className="text-2xl my-4 flex">
          <FaUserAlt /> <span className="ml-2">Create your account</span>
        </p>
        <form className="" onSubmit={(e) => registerHandler(e)}>
          <div className="my-5">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              required
            />
          </div>
          <div className="my-5">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              required
            />
            <small className="form-text">
              Profile image is fetched automatically via Gravatar.
            </small>
          </div>
          <div className="my-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"

              // minLength="6"
              // autoComplete="on"
            />
          </div>
          <div className="my-5">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmationPassword"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              // minLength="6"
              // autoComplete="on"
            />
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

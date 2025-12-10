import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import HeadTitle from "../components/HeadTitle";

const LogIn = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="tavern-container">
      <HeadTitle title="Enter the Tavern" />
      <div className="py-6 px-12">
        <p className="text-2xl my-4 flex ">
          <FaUserAlt /> <span className="ml-2">Sign in to your account</span>
        </p>
        <form className="" onSubmit={(e) => submitHandler(e)}>
          <div className="my-5">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              autoComplete="on"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
          </div>
          <div className="my-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
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

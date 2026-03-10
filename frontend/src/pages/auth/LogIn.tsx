import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import HeadTitle from "../../components/layout/HeadTitle";

import LogInForm from "./LogInForm";

const LogIn = () => {
  return (
    <div className="tavern-container">
      <HeadTitle title="Enter the Tavern" />
      <div className="py-6 px-12">
        <p className="text-2xl my-4 flex ">
          <FaUserAlt /> <span className="ml-2">Sign in to your account</span>
        </p>
        <LogInForm />
        <p className="my-4">
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default LogIn;

import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import HeadTitle from "../../components/layout/HeadTitle";

import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="tavern-container">
      <HeadTitle title="Join the Tavern" />

      <div className="py-6 px-12">
        <p className="text-2xl my-4 flex">
          <FaUserAlt /> <span className="ml-2">Create your account</span>
        </p>
        <SignUpForm />
        <p className="my-4">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

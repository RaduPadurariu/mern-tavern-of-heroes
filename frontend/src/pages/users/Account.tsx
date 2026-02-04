import { CgHello } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Form, Link } from "react-router";
import { useTavernContext } from "../../context/useContext";

const Account = () => {
  const { user } = useTavernContext();
  return (
    <div className="tavern-container">
      <div className="pt-6 pb-10 px-10">
        <div className="text-2xl my-4 text-(--primary-color) ">
          <div className="flex">
            <CgHello /> <span className="ml-2">Welcome, {user?.username}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/account/edit-profile`}
            className="text-(--light-color) inline-block bg-(--primary-color) px-[1.3rem] py-[0.4rem] text-base font-bold border-2 border-(--light-color) rounded-[5px] cursor-pointer transition-opacity duration-300 ease-in outline-none hover:opacity-75"
          >
            <div className="flex">
              <FiEdit /> <span className="ml-2">Edit Profile</span>
            </div>
          </Link>
          <Form method="delete" action="/account">
            <button
              type="submit"
              className="text-white inline-block bg-(--danger-color) px-[1.3rem] py-[0.4rem] text-base font-bold border-2 border-(--light-color) rounded-[5px] cursor-pointer mr-2 transition-opacity duration-300 ease-in outline-none hover:opacity-75"
            >
              <div className="flex">
                <RiDeleteBinLine />
                <span className="ml-2">Delete Account</span>
              </div>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Account;

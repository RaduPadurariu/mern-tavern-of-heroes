import { CgHello } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
// import { IoAddCircleOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

const Account = () => {
  return (
    <div className="tavern-container">
      <div className="pt-6 pb-10 px-10">
        <p className="text-2xl my-4 text-(--primary-color) ">
          <div className="flex">
            <CgHello /> <span className="ml-2">Welcome, Radu!</span>
          </div>
        </p>
        <Fragment>
          {/* <Link
            to="/create-profile"
            className="text-(--light-color) inline-block bg-(--primary-color) px-[1.3rem] py-[0.4rem] text-base font-bold border-2 border-(--light-color) rounded-[5px] cursor-pointer mr-2 transition-opacity duration-300 ease-in outline-none hover:opacity-75"
          >
            <div className="flex">
              <IoAddCircleOutline />
              <span className="ml-2">Create Profile</span>
            </div>
          </Link> */}
          <Link
            to="/account/edit-profile"
            className="text-(--light-color) inline-block bg-(--primary-color) px-[1.3rem] py-[0.4rem] text-base font-bold border-2 border-(--light-color) rounded-[5px] cursor-pointer mr-2 transition-opacity duration-300 ease-in outline-none hover:opacity-75"
          >
            <div className="flex">
              <FiEdit /> <span className="ml-2">Edit Profile</span>
            </div>
          </Link>
          <button
            className="text-white inline-block bg-(--danger-color) px-[1.3rem] py-[0.4rem] text-base font-bold border-2 border-(--light-color) rounded-[5px] cursor-pointer mr-2 transition-opacity duration-300 ease-in outline-none hover:opacity-75"
            // onClick={() => deleteAccount()}
          >
            <div className="flex">
              <RiDeleteBinLine />
              <span className="ml-2">Delete Account</span>
            </div>
          </button>
        </Fragment>
      </div>
    </div>
  );
};

export default Account;

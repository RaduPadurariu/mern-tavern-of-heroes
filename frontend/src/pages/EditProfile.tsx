import { Link } from "react-router";
import HeadTitle from "../components/HeadTitle";

const EditProfile = () => {
  return (
    <div className="tavern-container">
      <HeadTitle title="Edit Your Profile" />
      <div className="py-6 px-12">
        <form
          className=""
          // onSubmit={(e) => submitHandler(e)}
        >
          <div className="my-5">
            <input
              type="text"
              placeholder="Nickname"
              name="nickname"
              required
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              //   onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="my-5">
            <select
              name="gender"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              //   onChange={(e) => changeHandler(e)}
            >
              <option value="0">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="my-5">
            <input
              type="text"
              placeholder="Class"
              name="status"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"

              //   onChange={(e) => changeHandler(e)}
            />
            <small className="form-text">Warrior, Ranger, Mage ...</small>
          </div>
          <div className="flex flex-wrap">
            <button
              type="submit"
              className="my-1 text-(--light-color) bg-(--primary-color) text-xl py-1.5 px-5 border rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
            >
              Submit
            </button>
            <Link
              className="whitespace-nowrap text-(--primary-color) text-xl py-1.5 px-5 cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 my-1"
              to="/account"
            >
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

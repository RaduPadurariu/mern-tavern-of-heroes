import { FaFemale, FaMale } from "react-icons/fa";
import { Link } from "react-router";
import type { UserType } from "../../types/types";

const User = ({ user }: { user: UserType }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start m-5 bg-(--light-color) text-(--primary-color)">
      <div className="mt-4">
        <img
          src={`/images/${user.avatar}`}
          alt="no-avatar-img"
          className="rounded-full w-[75px] h-[75px]"
        />
      </div>

      <div className="flex flex-col justify-between my-4 mx-10">
        <div className="flex mb-3">
          <Link
            to={`/users/${user._id}`}
            className="text-3xl font-semibold mb-2 cursor-pointer"
          >
            {user.username}
          </Link>
          <span className="text-3xl ml-4">
            {user.gender && (
              <span>
                {user.gender === "Male" ? (
                  <FaMale />
                ) : user.gender === "Female" ? (
                  <FaFemale />
                ) : (
                  ""
                )}
              </span>
            )}
          </span>
        </div>

        <div className="text-xl mb-2 ">
          <div className="">nickname: {user.nickname}</div>
        </div>
        <div className="text-xl mb-2 ">
          <div className="">class: {user.heroClass}</div>{" "}
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default User;

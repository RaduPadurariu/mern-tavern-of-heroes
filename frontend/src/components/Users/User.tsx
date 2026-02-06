import { FaFemale, FaMale } from "react-icons/fa";
import { Link } from "react-router";
import type { UserType } from "../../types/types";

const User = ({ user }: { user: UserType }) => {
  return (
    <div className="flex flex-col md:flex-row m-5 bg-(--light-color) text-(--primary-color) mb-8">
      <div className="mb-4">
        <img
          src={user.avatar}
          alt="no-avatar-img"
          className="rounded-full w-[75px] h-[75px]"
          onError={(e) => {
            e.currentTarget.src = "/images/user.png";
          }}
        />
      </div>

      <div className="flex flex-col justify-between md:mx-10">
        <div className="flex">
          <Link
            to={`/users/${user._id}`}
            className="text-3xl font-semibold cursor-pointer"
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

        {user.nickname && (
          <div className="text-xl my-2 ">
            <div className="">nickname: {user.nickname}</div>
          </div>
        )}
        {user.heroClass && (
          <div className="text-xl mb-2 ">
            <div className="">class: {user.heroClass}</div>
          </div>
        )}
        <p></p>
      </div>
    </div>
  );
};

export default User;

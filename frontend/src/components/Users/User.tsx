import { FaFemale, FaMale } from "react-icons/fa";

const User = ({
  user,
}: {
  user: {
    id: number;
    name: string;
    nickname: string;
    gender: string;
    avatar: string;
  };
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center m-5 bg-(--light-color) text-(--primary-color)">
      <div>
        <img
          src={user?.avatar}
          alt="no-avatar-img"
          className="rounded-full w-[75px] h-[75px]"
        />
      </div>

      <div className="flex flex-col justify-between my-4 mx-10">
        <div className="flex">
          <h3 className="text-3xl font-semibold mb-2">{user.name}</h3>
          <span className="text-3xl ml-4">
            {user.gender && (
              <span>{user.gender === "male" ? <FaMale /> : <FaFemale />}</span>
            )}
          </span>
        </div>

        <p className="text-xl mb-2 ">
          <i>alias: {user.nickname}</i>{" "}
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default User;

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
    class: string;
  };
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start m-5 bg-(--light-color) text-(--primary-color)">
      <div className="mt-4">
        <img
          src={user?.avatar}
          alt="no-avatar-img"
          className="rounded-full w-[75px] h-[75px]"
        />
      </div>

      <div className="flex flex-col justify-between my-4 mx-10">
        <div className="flex mb-3">
          <h3 className="text-3xl font-semibold mb-2">{user.name}</h3>
          <span className="text-3xl ml-4">
            {user.gender && (
              <span>{user.gender === "male" ? <FaMale /> : <FaFemale />}</span>
            )}
          </span>
        </div>

        <p className="text-xl mb-2 ">
          <div className="">nickname: {user.nickname}</div>
        </p>
        <p className="text-xl mb-2 ">
          <div className="">class: {user.class}</div>{" "}
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default User;

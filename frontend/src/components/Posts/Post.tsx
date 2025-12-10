import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const Post = ({
  post,
}: {
  post: {
    id: number;
    date: string;
    user: string;
    avatar: string;
    title: string;
    text: string;
  };
}) => {
  return (
    <div className="flex flex-col md:flex-row bg-(--light-color) items-start border border-(--primary-color) rounded-[5px] m-0.5 p-3">
      {/* Avatar + Username */}
      <div className="flex flex-col items-center mr-4">
        <img
          className="rounded-full w-[75px] h-[75px] mb-2"
          src={post.avatar}
          alt="avatar"
        />
        <h4 className="text-(--primary-color)">{post.user}</h4>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className="my-1 text-(--primary-color) text-xl font-semibold inputFamily">
          {post.title}
        </h2>

        <div className="w-full py-2 px-1 max-h-[300px] inputFamily text-(--primary-color) overflow-y-auto whitespace-pre-wrap wrap-break-words">
          {post.text}
        </div>

        {/* Buttons */}
        <div className="flex items-center my-2 flex-wrap mt-7">
          <div>
            <button className="text-(--primary-color) px-2 hover:opacity-75 transition">
              <AiFillLike />
            </button>

            <button className="text-(--primary-color) px-2 hover:opacity-75 transition">
              <AiFillDislike />
            </button>
          </div>

          <div className="flex">
            <button className="text-white bg-(--primary-color) px-3 py-1 rounded-[5px] mx-1 flex items-center hover:opacity-75 transition">
              <MdOutlineEdit />
              <span className="ml-2">Edit</span>
            </button>

            <button className="text-white bg-(--danger-color) px-3 py-1 rounded-[5px] mx-1 flex items-center hover:opacity-75 transition">
              <MdOutlineDelete />
              <span className="ml-2">Delete</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-(--primary-color)">
          Posted on <span>{post.date}</span>
        </p>
      </div>
    </div>
  );
};

export default Post;

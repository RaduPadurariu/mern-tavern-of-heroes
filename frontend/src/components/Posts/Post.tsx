import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { Form, Link } from "react-router";
import type { PostType } from "../../types/types";

const Post = ({ post }: { post: PostType }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Form className="flex flex-col  bg-(--light-color) items-start border border-(--primary-color) rounded-[5px] m-0.5 p-3 w-full">
      <input type="hidden" />
      {/* Avatar + Username */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
        <div className="flex items-center mr-4">
          <img
            className="rounded-full w-16 h-16"
            src={`/images/${post.user?.avatar}`}
            alt="avatar"
          />
          <Link
            to={`/users/${post.user._id}`}
            className="text-(--primary-color) ml-6 font-semibold text-lg cursor-pointer"
          >
            {post.user?.username}
          </Link>
        </div>
        <p className="text-sm text-(--primary-color) mt-2 md:mt-0">
          Posted on <span>{formatDate(new Date().toISOString())}</span>
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 w-full">
        <div className="md:ml-22">
          <h2 className="my-1 text-(--primary-color) text-xl font-semibold inputFamily mb-2">
            {post.title}
          </h2>

          <div className="w-full py-2 text-sm inputFamily text-(--primary-color) leading-relaxed max-h-24 overflow-hidden">
            {post.content}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center my-2 mt-4 justify-between w-full">
          <div className="-ml-2 md:ml-20 flex">
            <button className="text-(--primary-color) px-2 hover:opacity-75 transition cursor-pointer">
              <AiFillLike />
            </button>
            <div className="text-(--primary-color) text-lg">0</div>
            <button className="text-(--primary-color) px-2 hover:opacity-75 transition cursor-pointer">
              <AiFillDislike />
            </button>
          </div>
          <div className="flex">
            <div className="flex">
              <Link
                to={`/posts/${post._id}`}
                className="text-white bg-(--primary-color) px-3 py-1 rounded-[5px] mx-1 flex items-center hover:opacity-75 transition cursor-pointer text-lg"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Post;

import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { Form, Link, useLoaderData } from "react-router";
import type { PostType } from "../../types/types";
import { useTavernContext } from "../../context/useContext";

const SinglePost = () => {
  const post = useLoaderData() as PostType;
  const { user } = useTavernContext();

  const isDeletedUser = !post.user;

  const username = isDeletedUser ? "Deleted user" : post.user.username;

  const avatar = isDeletedUser ? "/images/deletedUser.png" : post.user.avatar;

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
    <div className="tavern-container w-[90%] lg:w-900px">
      <div className="flex flex-col justify-center bg-(--primary-color) py-2 px-4 m-1 rounded-[5px] text-(--light-color) pb-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl leading-[1.2] my-4 m-0.5 py-3 md:py-8 px-10 rounded-t-[5px]">
            Rumor
          </h1>
        </div>
        <div className="flex flex-col  bg-(--light-color) items-start border border-(--primary-color) rounded-[5px] m-0.5 p-3 w-full">
          <input type="hidden" />
          {/* Avatar + Username */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
            <div className="flex items-center mr-4">
              <img
                className="rounded-full w-16 h-16"
                src={avatar}
                alt="avatar"
                onError={(e) => {
                  e.currentTarget.src = "/images/user.png";
                }}
              />

              {isDeletedUser ? (
                <span className="text-(--primary-color) ml-6 font-semibold text-lg opacity-70">
                  {username}
                </span>
              ) : (
                <Link
                  to={`/users/${post.user._id}`}
                  className="text-(--primary-color) ml-6 font-semibold text-lg cursor-pointer"
                >
                  {username}
                </Link>
              )}
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
            <div className="flex flex-wrap items-center my-2 mt-4 justify-between w-full">
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
                {user && post.user && user._id === post.user._id && (
                  <div className="flex">
                    <Link
                      to={`/posts/${post._id}/edit`}
                      className="text-white bg-(--primary-color) px-3 py-1 rounded-[5px] mx-1 flex items-center hover:opacity-75 transition cursor-pointer ml-0"
                    >
                      <MdOutlineEdit />
                      Edit
                    </Link>

                    <Form
                      method="delete"
                      onSubmit={(e) => {
                        if (
                          !confirm("Are you sure you want to delete this post?")
                        ) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <button
                        type="submit"
                        className="text-white bg-(--danger-color) px-3 py-1 rounded-[5px] mx-1 flex items-center hover:opacity-75 transition cursor-pointer"
                      >
                        <MdOutlineDelete />
                        <span className="ml-2">Delete</span>
                      </button>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

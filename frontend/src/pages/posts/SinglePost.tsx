import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { Form, Link, useLoaderData } from "react-router";
import type { PostType } from "../../types/types";
import { useTavernContext } from "../../context/useContext";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PostHeader from "../../components/Posts/PostHeader";
import PostReaction from "../../components/Posts/PostReaction";

const SinglePost = () => {
  const post = useLoaderData() as PostType;
  const { user } = useTavernContext();

  return (
    <div className="tavern-container w-[90%] lg:w-900px">
      <div className="flex flex-col justify-center bg-(--primary-color) py-2 px-4 m-1 rounded-[5px] text-(--light-color) pb-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl leading-[1.2] my-4 m-0.5 py-3 md:px-10 rounded-t-[5px]">
            Rumor
          </h1>
        </div>
        <Breadcrumbs />
        <div className="flex flex-col  bg-(--light-color) items-start border border-(--primary-color) rounded-[5px] m-0.5 p-3 w-full">
          <input type="hidden" />
          {/* Avatar + Username */}
          <PostHeader post={post} />

          {/* Content */}
          <div className="flex-1 w-full">
            <div className="md:ml-22">
              <h2 className="my-1 text-(--primary-color) text-[20px] font-semibold inputFamily py-4 md:mb-5 md:py-2">
                {post.title}
              </h2>

              <div className="w-full pb-2 text-sm inputFamily text-(--primary-color) leading-relaxed overflow-hidden">
                {post.content}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center my-2 mt-4 justify-between w-full">
              <PostReaction post={post} />
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

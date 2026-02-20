import { Form, Link } from "react-router";
import type { PostType } from "../../types/types";
import PostReaction from "./PostReaction";
import PostHeader from "./PostHeader";

const Post = ({ post }: { post: PostType }) => {
  return (
    <Form className="flex flex-col  bg-(--light-color) items-start border border-(--primary-color) rounded-[5px] m-0.5 mb-4 p-3 w-full">
      <input type="hidden" />
      {/* Avatar + Username */}
      <PostHeader post={post} />

      {/* Content */}
      <div className="flex-1 w-full">
        <div className="md:ml-22">
          <Link
            to={`/posts/${post._id}`}
            className="block text-(--primary-color) text-[20px] font-semibold inputFamily py-4 md:mb-5 md:py-2"
          >
            {post.title}
          </Link>

          <div className="w-full pb-2 text-sm inputFamily text-(--primary-color) leading-relaxed max-h-24 overflow-hidden">
            {post.content}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center my-2 mt-4 justify-between w-full">
          <PostReaction post={post} />
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

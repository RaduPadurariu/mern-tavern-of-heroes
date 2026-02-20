import { Link } from "react-router";
import type { PostType } from "../../types/types";

const PostHeader = ({ post }: { post: PostType }) => {
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
  );
};

export default PostHeader;

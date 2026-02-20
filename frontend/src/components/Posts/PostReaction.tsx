import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import type { PostType } from "../../types/types";
import { useEffect, useState } from "react";
import { useTavernContext } from "../../context/useContext";
import { useNavigate } from "react-router";

const PostReaction = ({ post }: { post: PostType }) => {
  const [likedBy, setLikedBy] = useState(post.likedBy);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useTavernContext();

  const isLiked = user ? likedBy.includes(user._id) : false;

  useEffect(() => {
    setLikedBy(post.likedBy);
  }, [post.likedBy]);

  const navigate = useNavigate();

  const handleLikeClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    handleReaction();
  };

  const handleReaction = async () => {
    if (isLoading || !user) return;
    setIsLoading(true);

    const previous = likedBy;

    setLikedBy((prev) => {
      if (!user) return prev;

      if (prev.includes(user._id)) {
        return prev.filter((id) => id !== user._id);
      }

      return [...prev, user._id];
    });

    try {
      const response = await fetch(`/api/posts/${post._id}/reaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed reaction");
      }

      const data = await response.json();

      setLikedBy(data.likedBy);
    } catch (error) {
      console.error(error);
      setLikedBy(previous);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="-ml-2 md:ml-20 flex">
      <button
        type="button"
        disabled={isLoading}
        onClick={handleLikeClick}
        className="text-(--primary-color) px-2 hover:opacity-75 transition cursor-pointer"
      >
        {isLiked ? <AiFillLike /> : <AiOutlineLike />}
      </button>

      <div className="text-(--primary-color) text-lg">{likedBy.length}</div>
    </div>
  );
};

export default PostReaction;

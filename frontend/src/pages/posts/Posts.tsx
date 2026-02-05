import { Link, useLoaderData } from "react-router";
import type { PostType } from "../../types/types";
import Post from "../../components/Posts/Post";
import Pagination from "../../components/Pagination/Pagination";
import { useTavernContext } from "../../context/useContext";

const Posts = () => {
  const posts = useLoaderData() as PostType[];
  const { user } = useTavernContext();

  return (
    <div className="tavern-container w-[90%] lg:w-900px">
      <div className="flex flex-col justify-center bg-(--primary-color) py-2 px-4 m-1 rounded-[5px] text-(--light-color)">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl leading-[1.2] my-4 m-0.5 py-3 md:py-8 px-10 rounded-t-[5px]">
            Rumors
          </h1>
          <Link
            to={user ? "/posts/new" : "/login"}
            className="rounded-full w-[30px] h-[30px] flex items-center justify-center md:w-[50px] md:h-[50px] bg-(--light-color) text-(--primary-color) text-2xl md:text-4xl mr-4 cursor-pointer"
          >
            +
          </Link>
        </div>
        {posts.length > 0 ? (
          <Pagination
            itemsPerPage={8}
            values={posts}
            renderItem={(post) => <Post key={post._id} post={post} />}
          />
        ) : (
          <div className="ml-12">No posts found</div>
        )}
      </div>
    </div>
  );
};

export default Posts;

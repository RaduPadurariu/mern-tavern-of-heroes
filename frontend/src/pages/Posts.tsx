import Post from "../components/Posts/Post";
import PostInput from "../components/Posts/PostInput";
import { posts } from "../data/data";

const Posts = () => {
  return (
    <div className="tavern-container w-[90%] lg:w-900px">
      <div className="flex flex-col justify-center bg-(--primary-color) py-2 px-4 m-1 rounded-[5px] text-(--light-color)">
        <div>
          <h1 className="text-3xl md:text-5xl leading-[1.2] my-4 m-0.5 py-3 md:py-8 px-10 rounded-t-[5px]">
            Rumors
          </h1>
        </div>
        <PostInput />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

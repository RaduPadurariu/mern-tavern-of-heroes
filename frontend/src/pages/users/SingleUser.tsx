import { useLoaderData } from "react-router";
import type { UserPageType } from "../../types/types";
import Post from "../../components/Posts/Post";
import Pagination from "../../components/Pagination/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const SingleUser = () => {
  const { user, posts } = useLoaderData() as UserPageType;
  return (
    <div className="tavern-container w-[90%] lg:w-900px">
      <div className="flex flex-col justify-center bg-(--primary-color) py-2 px-4 m-1 rounded-[5px] text-(--light-color)">
        <div className="flex justify-between items-center">
          <div className=" w-full">
            <div className="flex flex-col md:flex-row items-center my-4 pl-0 md:pl-10">
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <img
                  src={user.avatar}
                  alt="no-avatar"
                  className="rounded-lg max-w-[330px] w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = "/images/user.png";
                  }}
                />
              </div>
              <div className="flex w-full md:w-3/4 ml-2 md:ml-5 gap-4 mb-5">
                <div className="flex flex-col gap-3">
                  <div className="md:text-xl">
                    <span className="md:ml-4">Username: </span>
                    <span className="ml-7">{user.username} </span>
                  </div>
                  <div className="md:text-xl">
                    <span className="md:ml-4">Nickname: </span>
                    <span className="ml-8">{user.nickname ?? "-"}</span>
                  </div>
                  <div className="md:text-xl">
                    <span className="md:ml-4">Gender: </span>
                    <span className="ml-11">{user.gender ?? "-"}</span>
                  </div>
                  <div className="md:text-xl">
                    <span className="md:ml-4">Hero Class: </span>
                    <span className="ml-3">{user.heroClass ?? "-"}</span>
                  </div>
                </div>
              </div>
            </div>
            <Breadcrumbs />
            {/* <h1 className="text-xl md:text-3xl leading-[1.2] mt-6 mb-2 m-0.5 py-3 md:py-5 rounded-t-[5px]">
              {user.username}'s posts:
            </h1> */}
          </div>
        </div>
        <Pagination
          itemsPerPage={8}
          values={posts}
          renderItem={(post) => <Post key={post._id} post={post} />}
        />
      </div>
    </div>
  );
};

export default SingleUser;

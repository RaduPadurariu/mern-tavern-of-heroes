import { useLoaderData } from "react-router";
import HeadTitle from "../../components/HeadTitle";
import Pagination from "../../components/Pagination/Pagination";
import type { UserType } from "../../types/types";
import User from "../../components/Users/User";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Users = () => {
  const users = useLoaderData() as UserType[];
  return (
    <div className="tavern-container">
      <HeadTitle title="Tavern Heroes" />
      <div className="bg-(--primary-color) -mt-7 text-(--light-color) mx-0.5 p-1">
        <Breadcrumbs />
      </div>

      <div className="py-6 px-2 md:px-10">
        <div className="flex flex-col gap-2 flex-wrap pl-2">
          {users.length > 0 ? (
            <Pagination
              itemsPerPage={8}
              values={users}
              renderItem={(user) => <User key={user._id} user={user} />}
            />
          ) : (
            <div className="text-lg">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

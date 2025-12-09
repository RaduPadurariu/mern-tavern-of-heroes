import User from "../components/Users/User";
import { users } from "../data/data";

const Heroes = () => {
  return (
    <div className="tavern-container">
      <h1 className="text-3xl md:text-5xl leading-[1.2] mb-4 text-(--light-color) bg-(--primary-color) m-0.5 py-8 px-12 rounded-t-[5px]">
        Tavern Heroes
      </h1>
      <div className="py-6 px-2 md:px-10">
        <div className="flex flex-col space-between flex-wrap pl-2">
          {users.length > 0 ? (
            users.map((user) => <User key={user.id} user={user} />)
          ) : (
            <h4>No users found</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Heroes;

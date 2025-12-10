import HeadTitle from "../components/HeadTitle";
import User from "../components/Users/User";
import { users } from "../data/data";

const Heroes = () => {
  return (
    <div className="tavern-container">
      <HeadTitle title="Tavern Heroes" />
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

import { Form, Link, Navigate } from "react-router";

import { useProfileReducer } from "../../hooks/useProfileReducer";
import HeadTitle from "../../components/HeadTitle";

import { useEffect } from "react";
import { useTavernContext } from "../../context/useContext";

const EditProfile = () => {
  const { state, dispatch } = useProfileReducer();
  const { user, isLoading } = useTavernContext();

  useEffect(() => {
    if (!user) return;
    dispatch({ type: "SET_NICKNAME", payload: user.nickname ?? "" });
    dispatch({ type: "SET_GENDER", payload: user.gender ?? "" });
    dispatch({ type: "SET_HERO_CLASS", payload: user.heroClass ?? "" });
    dispatch({ type: "SET_USERNAME", payload: user.username ?? "" });
    dispatch({ type: "SET_EMAIL", payload: user.email ?? "" });
  }, [user, dispatch]);

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="tavern-container">
      <HeadTitle title="Edit Your Profile" />
      <div className="py-6 px-12">
        <Form method="patch">
          <div className="mt-5">
            <input
              type="text"
              placeholder="Username"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
              name="username"
              disabled
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
            <div className="text-sm mt-0.5 text-gray-600 mb-2 ml-1 min-h-5">
              Username cannot be changed
            </div>
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              name="email"
              disabled
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
            <div className="text-sm mt-0.5 text-gray-600 mb-2 ml-1 min-h-5">
              Email cannot be changed
            </div>
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Nickname"
              value={state.nickname}
              onChange={(e) =>
                dispatch({ type: "SET_NICKNAME", payload: e.target.value })
              }
              name="nickname"
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5"></div>
          </div>
          <div className="mb-1">
            <select
              name="gender"
              value={state.gender ?? "none"}
              onChange={(e) =>
                dispatch({ type: "SET_GENDER", payload: e.target.value })
              }
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            >
              <option value="none">No Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5"></div>
          </div>

          <div className="mb-1">
            <input
              type="text"
              placeholder="Hero class"
              name="heroClass"
              value={state.heroClass}
              onChange={(e) =>
                dispatch({ type: "SET_HERO_CLASS", payload: e.target.value })
              }
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
            <small className="form-text">Warrior, Ranger, Mage ...</small>
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5"></div>
          </div>
          <div className="flex flex-wrap">
            <button
              type="submit"
              className="my-1 text-(--light-color) bg-(--primary-color) text-xl py-1.5 px-5 border rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
            >
              Submit
            </button>
            <Link
              onClick={(e) => {
                if (
                  state.nickname !== user.nickname ||
                  state.gender !== user.gender ||
                  state.heroClass !== user.heroClass
                ) {
                  if (!confirm("Discard changes?")) {
                    e.preventDefault();
                  }
                }
              }}
              className="whitespace-nowrap text-(--primary-color) text-xl py-1.5 px-5 cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 my-1"
              to="/account"
            >
              Go Back
            </Link>
          </div>
          <div className="text-sm mt-0.5 text-green-700 mb-2 ml-1 min-h-5"></div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;

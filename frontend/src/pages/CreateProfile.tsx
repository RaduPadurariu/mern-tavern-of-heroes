import { Link } from "react-router";
import HeadTitle from "../components/HeadTitle";
import { useProfileReducer } from "../hooks/useProfileReducer";
import {
  checkGender,
  checkHeroClass,
  checkNickname,
} from "../components/ValidationErrors";

const CreateProfile = () => {
  const { state, dispatch } = useProfileReducer();

  const nicknameErrors = state.isAfterSubmit
    ? checkNickname(state.nickname)
    : [];

  const genderErrors = state.isAfterSubmit ? checkGender(state.gender) : [];

  const heroClassErrors = state.isAfterSubmit
    ? checkHeroClass(state.heroClass)
    : [];

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "IS_AFTER_SUBMIT", payload: true });

    const nicknameErrors = checkNickname(state.nickname);
    const genderErrors = checkGender(state.gender);
    const heroClassErrors = checkHeroClass(state.heroClass);

    if (
      nicknameErrors.length > 0 ||
      genderErrors.length > 0 ||
      heroClassErrors.length > 0
    ) {
      return;
    }

    dispatch({ type: "SET_NICKNAME", payload: "" });
    dispatch({ type: "SET_GENDER", payload: "" });
    dispatch({ type: "SET_HERO_CLASS", payload: "" });
    dispatch({ type: "IS_AFTER_SUBMIT", payload: false });

    dispatch({ type: "SUBMIT_STATUS", payload: true });

    setTimeout(() => {
      dispatch({ type: "SUBMIT_STATUS", payload: false });
    }, 3000);
  };
  return (
    <div className="tavern-container">
      <HeadTitle title="Create Your Profile" />
      <div className="py-6 px-12">
        <form className="" onSubmit={(e) => submitHandler(e)}>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Nickname"
              name="nickname"
              required
              value={state.nickname}
              onChange={(e) =>
                dispatch({ type: "SET_NICKNAME", payload: e.target.value })
              }
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
            />
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
              {nicknameErrors.length > 0 &&
                nicknameErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>
          <div className="mb-1">
            <select
              name="gender"
              required
              value={state.gender}
              onChange={(e) =>
                dispatch({ type: "SET_GENDER", payload: e.target.value })
              }
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"
              //   onChange={(e) => changeHandler(e)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
              {genderErrors.length > 0 &&
                genderErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>

          <div className="mb-1">
            <input
              type="text"
              placeholder="Hero class"
              required
              name="status"
              value={state.heroClass}
              onChange={(e) =>
                dispatch({ type: "SET_HERO_CLASS", payload: e.target.value })
              }
              className="block w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] bg-white inputFamily placeholder:text-[#777] focus:outline-(--primary-color)"

              //   onChange={(e) => changeHandler(e)}
            />
            <small className="form-text">Warrior, Ranger, Mage ...</small>
            <div className="text-sm mt-0.5 text-red-700 mb-2 ml-1 min-h-5">
              {heroClassErrors.length > 0 &&
                heroClassErrors.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          </div>

          <div className="flex flex-wrap">
            <button
              type="submit"
              className="my-1 text-(--light-color) bg-(--primary-color) text-xl py-1.5 px-5 border rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
            >
              Submit
            </button>
            <Link
              className="whitespace-nowrap text-(--primary-color) text-xl py-1.5 px-5 cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 my-1"
              to="/account"
            >
              Go Back
            </Link>
          </div>
          <div className="text-sm mt-0.5 text-green-700 mb-2 ml-1 min-h-5">
            {state.submitStatus && "Profile created successfully."}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;

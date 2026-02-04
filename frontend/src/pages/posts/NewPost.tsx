import { Form, Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { useRumorsReducer } from "../../hooks/useRumorsReducer";
import {
  checkRumorContent,
  checkRumorTitle,
} from "../../components/ValidationErrors";

const NewPost = () => {
  const { state, dispatch } = useRumorsReducer();

  const titleErrors = state.isAfterSubmit ? checkRumorTitle(state.title) : [];
  const contentErrors = state.isAfterSubmit
    ? checkRumorContent(state.content)
    : [];

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch({ type: "IS_AFTER_SUBMIT", payload: true });

    const titleErrors = checkRumorTitle(state.title);
    const contentErrors = checkRumorContent(state.content);

    if (titleErrors.length > 0 || contentErrors.length > 0) {
      e.preventDefault();
      return;
    }
  };
  return (
    <div className="tavern-container w-[90%] lg:w-900px">
      <div className="flex flex-col justify-center bg-(--primary-color) py-2 px-4 m-1 rounded-[5px] text-(--light-color)">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl md:text-4xl leading-[1.2] my-4 m-0.5 py-1 md:py-4 rounded-t-[5px]">
            New Rumor
          </h1>
        </div>

        <Fragment>
          <div className={"mt-2"}>
            <Form
              method="post"
              className="my-1 flex flex-col"
              onSubmit={(e) => submitHandler(e)}
            >
              <input
                type="text"
                className="my-1 text-(--primary-color) bg-[#F7F3F3] w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] focus:outline-(--primary-color) placeholder:text-[#777] inputFamily"
                style={{ borderStyle: "none" }}
                placeholder="Rumor title"
                name="title"
                value={state.title}
                onChange={(e) =>
                  dispatch({ type: "SET_TITLE", payload: e.target.value })
                }
                required
              />
              <textarea
                className="my-1 text-(--primary-color) h-[150px] bg-[#F7F3F3] w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] placeholder:text-[#777] resize-none inputFamily focus:outline-none"
                style={{ borderStyle: "none" }}
                name="content"
                value={state.content}
                placeholder="Rumor content"
                onChange={(e) =>
                  dispatch({ type: "SET_CONTENT", payload: e.target.value })
                }
                required
              ></textarea>
              <div className="flex">
                <button
                  type="submit"
                  className="my-1 mt-4 text-(--light-color) bg-(--primary-color) text-xl py-2 px-6 border-2 rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 mr-4"
                  name="intent"
                  value="create"
                >
                  Post
                </button>
                <Link
                  to="/posts"
                  className="my-1  mt-4 text-(--light-color) bg-(--primary-color) text-xl py-2 px-6 border-2 rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
                >
                  Cancel
                </Link>
              </div>

              <div className="text-sm mt-0.5 text-red-400 mb-2 ml-1 min-h-5">
                <span>
                  {titleErrors.length > 0 &&
                    titleErrors.map((err, i) => <span key={i}>{err}</span>)}
                </span>
                <span>
                  {contentErrors.length > 0 &&
                    contentErrors.map((err, i) => <span key={i}>{err}</span>)}
                </span>
              </div>
            </Form>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default NewPost;

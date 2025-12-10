import { Fragment } from "react/jsx-runtime";

const PostInput = () => {
  return (
    <Fragment>
      <div className="mb-5">
        <form
          className="my-1 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            // addPost({ title, text });
            // // clear the form
            // setTitle("");
            // setText("");
          }}
        >
          <input
            type="text"
            className="my-1 text-(--primary-color) bg-[#F7F3F3] w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] focus:outline-(--primary-color) placeholder:text-[#777] inputFamily"
            style={{ borderStyle: "none" }}
            placeholder="Post title"
            name="title"
            // onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="my-1 text-(--primary-color) h-[150px] bg-[#F7F3F3] w-full p-1.5 text-lg border border-(--primary-color) rounded-[3px] placeholder:text-[#777] resize-none inputFamily focus:outline-none"
            style={{ borderStyle: "none" }}
            name="text"
            placeholder="Description"
            required
          ></textarea>
          <button
            type="submit"
            className="my-1 w-[100px] mt-4 text-(--light-color) bg-(--primary-color) text-xl py-2 px-5 border-2 rounded-[5px] cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 "
          >
            Post
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default PostInput;

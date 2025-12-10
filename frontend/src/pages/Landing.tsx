import { Link } from "react-router";

const Landing = () => {
  return (
    <section className="flex items-center justify-center text-center text-(--light-color) w-full pb-40">
      <div className="flex flex-col items-center justify-center">
        <Link
          to="/login"
          className="text-(--light-color) bg-(--primary-color) mb-4 md:mb-8 inline-block px-2 py-1.5 md:py-3.5 md:px-5 font-bold rounded-[10px] cursor-pointer w-[150px] md:w-[200px] text-xl md:text-3xl  outline-0 border-2 border-(--light-color) hover:text-(--primary-color) hover:bg-(--light-color) transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-(--light-color) bg-(--primary-color)  inline-block px-2 py-1.5 md:py-3.5 md:px-5 font-bold rounded-[10px] cursor-pointer w-[150px] md:w-[200px] text-xl md:text-3xl  outline-0 border-2 border-(--light-color) hover:text-(--primary-color) hover:bg-(--light-color) transition-all duration-300 ease-in-out"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
};

export default Landing;

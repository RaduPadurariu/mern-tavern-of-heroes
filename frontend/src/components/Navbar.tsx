import { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { MdOutlineAccountBox } from "react-icons/md";
import { Link } from "react-router";

const Navbar = () => {
  const [logo, setLogo] = useState(false);

  const changeLogo = () => {
    if (window.scrollY >= 50) {
      setLogo(true);
    } else {
      setLogo(false);
    }
  };

  window.addEventListener("scroll", changeLogo);

  return (
    <nav className="flex items-center justify-between py-[0.7rem] px-2 md:px-8 fixed z-10 w-full top-0 text-2xl font-bold  bg-(--primary-color)">
      <div className="flex items-center">
        <div className="relative self-start mx-auto ml-[10vw] mr-[30px]">
          <div className="flex flex-col items-center justify-center absolute top-[-30px] pl-6">
            <div className="w-[11px] h-[15px] rounded-full border-[3px] border-(--light-color) animate-[banner2_1.2s_ease_forwards]"></div>
            <div className="w-[11px] h-[15px] rounded-full border-[3px] border-(--light-color) animate-[banner2_1.2s_ease_forwards]"></div>
            <div className="w-2 h-3 bg-(--light-color) rounded-sm animate-[banner1_1.2s_ease_forwards]"></div>
            <div className="w-5 h-5 rounded-full border-[5px] border-(--light-color) animate-[banner1_1.2s_ease_forwards]"></div>
            <Link
              className={`${
                logo ? "md:w-[150px] md:h-[37px]" : "md:w-[230px] md:h-[200px] "
              } w-[150px]  h-[37px]  absolute top-[52px] bg-[url('/images/logobg.png')] bg-center bg-cover animate-[banner1_1.2s_ease_forwards] transition-all duration-300 ease-in-out`}
              to="/"
            ></Link>
          </div>
        </div>
      </div>
      <ul className="flex items-center justify-center text-center">
        <li>
          <Link
            to="/heroes"
            className="text-(--light-color) px-0.5 md:px-2 py-2 my-0 mx-0.5 flex items-center hover:bg-gray-500/20 rounded-[5px] duration-300 transition-all ease-in-out "
          >
            <FiSearch className="hidden md:block mr-1" />{" "}
            <span className="text-sm sm:text-xl md:text-2xl">Heroes</span>
          </Link>
        </li>
        <li>
          <Link
            to="/posts"
            className="text-(--light-color) px-0.5 md:px-2 py-2 my-0 mx-0.5 flex items-center hover:bg-gray-500/20 rounded-[5px] duration-300 transition-all ease-in-out"
          >
            <BiEditAlt className="hidden md:block mr-1" />
            <span className="text-sm sm:text-xl md:text-2xl">Gossips</span>
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-(--light-color) px-0.5 md:px-2 py-2 my-0 mx-0.5 flex items-center hover:bg-gray-500/20 rounded-[5px] duration-300 transition-all ease-in-out"
          >
            <AiOutlineLogin className="hidden md:block mr-1" />
            <span className="text-sm sm:text-xl md:text-2xl whitespace-nowrap">
              Log in
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="text-(--light-color) px-0.5 md:px-2 py-2 my-0 mx-0.5 flex items-center hover:bg-gray-500/20 rounded-[5px] duration-300 transition-all ease-in-out"
          >
            <MdOutlineAccountBox className="hidden md:block mr-1" />
            <span className="text-sm sm:text-xl md:text-2xl whitespace-nowrap">
              Sign up
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

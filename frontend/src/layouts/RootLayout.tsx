import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/Navbar";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;

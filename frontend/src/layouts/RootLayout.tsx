import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const RootLayout = () => {
  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-(--secondary-color) overflow-auto tavern-bg ">
      <Navbar />
      <div className="flex-1 flex items-center mt-20 pt-20 md:pt-50 pb-5 md:pb-10 min-h-100 z-2">
        <ScrollRestoration />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;

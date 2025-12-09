import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const RootLayout = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between overflow-auto bg-no-repeat bg-center bg-cover bg-[linear-gradient(#0000006b,#0000006b),url('/images/heroimg.png')]">
      <Navbar />
      <div className="flex-1 flex items-center mt-20 pt-20 md:pt-50 pb-20 md:pb-50 min-h-100">
        <ScrollRestoration />
        <Outlet />
      </div>

      <Footer />
    </main>
  );
};

export default RootLayout;

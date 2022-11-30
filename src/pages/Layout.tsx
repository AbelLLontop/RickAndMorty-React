import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster position="bottom-center" toastOptions={{duration:1600}} />
    </>
  );
};

export default Layout;

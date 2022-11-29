import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster position="bottom-center" toastOptions={{duration:1600}} />
    </>
  );
};

export default Layout;

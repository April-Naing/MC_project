import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex h-screen">
      <SideBar />
      <div className="w-full h-full overflow-auto">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;

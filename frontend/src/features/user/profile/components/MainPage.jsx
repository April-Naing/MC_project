import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const UserProfileMainPage = () => {
  return (
    <div className="flex h-screen">
      <div className="">
        <SideBar />
      </div>
      <div className="w-11/12 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfileMainPage;

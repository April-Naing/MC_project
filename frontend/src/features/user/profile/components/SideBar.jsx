import User from "@/assets/icons/user.svg?react";
import Coupon from "@/assets/icons/coupon.svg?react";
import { Link } from "react-router-dom";
import Logout from "@/assets/icons/logout.svg?react";
import Arrow from "@/assets/icons/arrow.svg?react";
import LogOut from "../../../auth/routes/LogOut";
import { useState } from "react";
const List = ({ className, children }) => {
  return (
    <li
      className={`flex py-2 text-start ps-8 text-teal-700 hover:bg-teal-600 sm:hover:mx-4 hover:rounded-sm hover:text-slate-50 ${className}`}
    >
      {children}
    </li>
  );
};
const SideBar = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const clickHandler = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <div className="h-screen shadow-md w-full sm:w-40 md:w-64 xl:w-72 overflow-auto">
        <div className="flex items-center justify-center h-16 text-start text-teal-600">
          <span className="text-center sm:text-2xl font-semibold">
            User Profile
          </span>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <Link to="" className="my-2">
              <List>
                <div className="flex sm:m-auto">
                  <User className="icon mr-2" />
                  <span className="hidden sm:inline"> User Info</span>
                </div>
              </List>
            </Link>
            <Link to="coupons">
              <List>
                <div className="flex sm:m-auto">
                  <Coupon className="icon mr-2" />
                  <span className="hidden sm:inline">Coupons</span>
                </div>
              </List>
            </Link>
            <Link to="pointChange">
              <List>
                <div className="flex sm:m-auto">
                  <Arrow className="icon ml-2 w-4 mr-2" />
                  <span className="hidden sm:inline">Point changer</span>
                </div>
              </List>
            </Link>
            <List>
              <div
                className="flex sm:m-auto hover:cursor-pointer"
                onClick={clickHandler}
              >
                <Logout className="icon w-5 mr-2" />
                <span className="hidden sm:inline">Log out</span>
              </div>
            </List>
          </ul>
        </nav>
      </div>
      <LogOut isOpen={openDialog} setIsOpen={() => setOpenDialog(false)} />
    </>
  );
};

export default SideBar;

import { Link } from "react-router-dom";
import User from "@/assets/icons/user.svg?react";
import Product from "@/assets/icons/product.svg?react";
import Coupon from "@/assets/icons/coupon.svg?react";
import Cart from "@/assets/icons/cart.svg?react";
import Promotion from "@/assets/icons/promotion.svg?react";
import UserRole from "@/assets/icons/userRole.svg?react";
import { useState } from "react";
import LogOut from "@/features/auth/routes/LogOut";
import Logout from "@/assets/icons/logout.svg?react";

const SideBar = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const linkStyle =
    "flex py-2 text-start ps-8 text-slate-500 hover:bg-cyan-500 hover:mx-4 hover:rounded-sm hover:text-slate-50";

  const clickHandler = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <div className="h-auto overflow-auto w-32 sm:w-40 md:w-64 xl:w-72 bg-slate-50 shadow-md">
        <div className="flex items-center justify-center h-16 text-start text-slate-900">
          <span className="me-auto ms-10 text-2xl font-semibold">Logo</span>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link to="" className={linkStyle}>
                <User className="icon mr-2" />
                <span className="hidden sm:inline"> Users</span>
              </Link>
            </li>
            <li>
              <Link to="products" className={linkStyle}>
                <Product className="icon mr-2" />
                <span className="hidden sm:inline"> Products</span>
              </Link>
            </li>
            <li>
              <Link to="coupons" className={linkStyle}>
                <Coupon className="icon mr-2" />
                <span className="hidden sm:inline">Coupons</span>
              </Link>
            </li>
            <li>
              <Link to="orders" className={linkStyle}>
                <Cart className="w-4 icon mr-2 " />
                <span className="hidden sm:inline">Orders</span>
              </Link>
            </li>
            <li>
              <Link to="promotions" className={linkStyle}>
                <Promotion className="w-4 icon mr-2 " />
                <span className="hidden sm:inline">Promotions</span>
              </Link>
            </li>
            <li>
              <Link to="roles" className={linkStyle}>
                <UserRole className="w-4 icon mr-2 " />
                <span className="hidden sm:inline">Roles</span>
              </Link>
            </li>
            <li onClick={clickHandler}>
              <Link className={linkStyle}>
                <Logout className="w-4 icon mr-2 " />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <LogOut isOpen={openDialog} setIsOpen={() => setOpenDialog(false)} />
    </>
  );
};

export default SideBar;

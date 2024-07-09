import Cart from "@/assets/icons/cart.svg?react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

const Header = () => {
  const scrollToSection = (id) => {
    scroll.scrollTo(document.getElementById(id).offsetTop, {
      duration: 500,
      smooth: true,
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 py-8 flex items-center shadow-sm justify-between bg-white z-50">
        <div className="absolute left-0 ml-8">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/home#products"
                onClick={() => scrollToSection("products")}
                className=" text-teal-600 hover:text-teal-800"
              >
                SHOP
              </Link>
            </li>
            <li>
              <Link
                to="/home#promotions"
                onClick={() => scrollToSection("promotions")}
                className=" text-teal-600 hover:text-teal-800"
              >
                PROMOTIONS
              </Link>
            </li>
            <li>
              <Link
                to="/home#contact"
                onClick={() => scrollToSection("contact")}
                className=" text-teal-600 hover:text-teal-800"
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
        <div className="absolute right-10 mr-4 flex items-center space-x-4">
          {/* <a href="/login" className=" text-teal-600 hover:text-teal-800">
          Log In
        </a> */}
          <Link to="/home/user" className=" text-teal-600 hover:text-teal-800">
            Profile
          </Link>
          <div className="relative">
            <Link to="cart" className=" text-teal-600 hover:text-teal-800">
              <Cart className="w-6 icon" />
              {/* <span className="absolute w-5 -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            2
          </span> */}
            </Link>
          </div>
        </div>
      </header>
      <div className="pt-24">
        <Outlet />
      </div>
    </>
  );
};

export default Header;
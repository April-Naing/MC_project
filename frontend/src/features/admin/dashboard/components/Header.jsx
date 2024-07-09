import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-50 h-16 me-0 shadow-md flex">
      <div className="">
        <h1 className=" text-cyan-400 text-xl font-bold ms-8 my-4">
          DashBoard
        </h1>
      </div>
      <Link
        to="profile"
        className=" text-cyan-400 text-xl ml-auto my-4 me-auto hover:text-cyan-600"
      >
        Profile
      </Link>
    </div>
  );
};

export default Header;

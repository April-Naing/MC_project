import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

function App() {
  const location = useLocation();
  // console.log("location", location);

  useEffect(() => {
    if (location.pathname === "/home" && location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        scroll.scrollTo(element.offsetTop, {
          duration: 500,
          smooth: true,
        });
      }
    }
  }, [location]);

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Outlet />
    </>
  );
}

export default App;

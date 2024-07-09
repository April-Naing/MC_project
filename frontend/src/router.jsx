import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/routes/Register";
import Login from "./features/auth/routes/LogIn";
import Layout from "./features/admin/dashboard/components/Layout";
import Users from "./features/admin/users/routes/Users";
import UserForm from "./features/admin/users/components/UserForm";
import Products from "./features/admin/products/routes/Products";
import Orders from "./features/admin/order/routes/Orders";
import Promotions from "./features/admin/promotion/routes/Promotions";
import MainPage from "./features/user/mainLayout/components/MainPage";
import ProductDetail from "./features/user/products/components/ProductDetail";
import Header from "./features/user/mainLayout/components/Header";
import Cart from "./features/user/Cart/components/Cart";
import UserProfileMainPage from "./features/user/profile/components/MainPage";
import UserInfo from "./features/user/profile/routes/UserInfo";
import Coupons from "./features/user/profile/routes/Coupons";
import PointChanger from "./features/user/profile/routes/PointsChanger";
import ProtectedRoute from "./features/auth/routes/ProtectRoute";
import CouponsList from "./features/admin/coupon/routes/CouponsList";
import Roles from "./features/admin/role/routes/Roles";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { index: true, element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/protect", element: <ProtectedRoute /> },
      {
        path: "/dashboard",
        element: <Layout />,
        children: [
          { path: "", element: <Users /> },
          { path: "create", element: <UserForm /> },
          {
            path: "products",
            element: <Products />,
          },
          { path: "orders", element: <Orders /> },
          { path: "coupons", element: <CouponsList /> },
          { path: "promotions", element: <Promotions /> },
          { path: "roles", element: <Roles /> },
          { path: "profile", element: <UserInfo /> },
        ],
      },
      {
        path: "/home",
        element: <Header />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          { path: "product/:id", element: <ProductDetail /> },
          { path: "cart", element: <Cart /> },
          {
            path: "user",
            element: <UserProfileMainPage />,
            children: [
              { index: true, element: <UserInfo /> },
              { path: "coupons", element: <Coupons /> },
              { path: "pointChange", element: <PointChanger /> },
              { path: "" },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

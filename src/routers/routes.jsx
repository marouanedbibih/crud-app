import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import Login from "../views/Login";
import Signup from "../views/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import User from "../views/User";
import NotFound from "../views/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/users",
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

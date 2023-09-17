import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import Login from "../views/Login";
import Signup from "../views/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../views/NotFound";
import Users from "../views/Users";
import UserForm from "../views/UserForm";

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
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

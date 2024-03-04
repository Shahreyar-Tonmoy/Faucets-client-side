import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import Login from "../Components/Login/Login";
import Signup from "../Components/Sign Up/Signup";
import Profile from "../Components/Profile";
import Faq from "../Components/Faq/Faq";
import Dashboard from "../Components/DashBoard/Dashboard";
import DashboardHome from "../Components/DashBoard/DashboardHome";
import AllUser from "../Components/DashBoard/AllUser";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: "sdfsadf" ,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      },
      {
        path: "/faq",
        element: <Faq></Faq>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: "sdfsadf" ,
    children: [
      {
        path: "/dashboard",
        element: <AllUser></AllUser>
      },

    ],
  },




]);
export default Router;

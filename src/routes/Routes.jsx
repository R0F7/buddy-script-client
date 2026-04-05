import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage></ErrorPage>,
    // children: [
    //   {
    //     index: true,
    //     element: <Home></Home>,
    //   },
    //   {
    //     path: "/contact-us",
    //     element: <Contact></Contact>,
    //   },
    // ],
  },
    {
      path: "/login",
      element: <Login></Login>,
    },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
]);

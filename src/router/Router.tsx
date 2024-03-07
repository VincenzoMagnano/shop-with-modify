import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUpForm from "../components/SignupForm/SignupForm";
import Login from "../pages/Login/Login";
import Handler from "../pages/Handler/Handler";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "signup", element: <SignUpPage /> },
        { path: "login", element: <Login /> },
      ],
    },
    { path: "/handler", element: <Handler /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

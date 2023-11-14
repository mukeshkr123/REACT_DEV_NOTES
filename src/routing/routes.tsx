import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import AllBoards from "../components/Boards";
import SingleBoard from "../components/Boards/SingleBoard/SingleBoard";
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "boards",
        element: <AllBoards />,
      },
      {
        path: "boards/:board_id",
        element: <SingleBoard />,
      },
    ],
  },
]);

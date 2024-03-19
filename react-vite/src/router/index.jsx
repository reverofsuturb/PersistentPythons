import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import { AllBoards, SingleBoard, PostBoards } from "../components/Boards";
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
        path: "boards/new",
        element: <PostBoards />
      },
      {
        path: "boards/:board_id",
        element: <SingleBoard />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import { AllBoards, SingleBoard, PostBoard } from "../components/Boards";
import { AllLists, PostList, EditList } from "../components/Lists";
import PostCard from "../components/Cards/AllCards/PostCard";
import Layout from "./Layout";
import EditBoard from "../components/Boards/EditBoard";
import HomePage from "../components/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        element: <PostBoard />,
      },
      {
        path: "boards/:board_id",
        element: <SingleBoard />,
      },
      {
        path: "boards/:board_id/edit",
        element: <EditBoard />,
      },
      {
        path: "boards/:board_id/lists",
        element: <AllLists />,
      },
      {
        path: "boards/:board_id/lists/new",
        element: <PostList />,
      },
      {
        path: "lists/:list_id/edit",
        element: <EditList />,
      },
      {
        path: "lists/:list_id/cards/new",
        element: <PostCard />,
      },
    ],
  },
]);

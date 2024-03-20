import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import { AllBoards, SingleBoard, PostBoard } from "../components/Boards";
import AllLists from "../components/Lists/AllLists/AllLists";
import PostLists from "../components/Lists/PostLists/PostLists";
import EditList from "../components/Lists/EditList/EditList";
import PostCard from "../components/Cards/PostCards/PostCard";
import Layout from "./Layout";
import EditBoard from "../components/Boards/EditBoards/EditBoard";

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
        element: <PostLists />,
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

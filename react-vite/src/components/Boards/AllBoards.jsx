import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./AllBoards.css";
import { RiSpaceShipFill } from "react-icons/ri";
import { MdWorkspaces } from "react-icons/md";
import PostBoard from "./PostBoard";
import OpenModalButton from "../OpenModalButton";

export default function AllBoards() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [showBoards, setShowBoards] = useState(false)
  console.log("🚀 ~ AllBoards ~ showBoards:", showBoards)

  const allBoards = Object.values(boards);



  useEffect(() => {
    dispatch(thunkGetAllBoards());
  }, [dispatch]);

  return (
    <>
      <div className="ab-outer-div_container">
        <>
          <div id="boardsTitleContainer" className="ab-inner-div_container">
            <h2 className="ab-h2">
              <RiSpaceShipFill />
              Your Boards
            </h2>
          </div>
          <div id="secondHalfContainerBoards">
            <div id="boardsLeftSideContainer">
              {allBoards && allBoards.length > 0 ? (
                allBoards.map((board) => (
                  <div key={board.id} className="ab-boards-tile-left">
                    <MdWorkspaces />
                    <NavLink
                      className={"ab-boards-link-left"}
                      to={`/boards/${board.id}`}
                    >
                      {board.board_name}
                    </NavLink>
                  </div>
                ))
              ) : (
                <div>No boards available</div>
              )}
            </div>


            <div id="boardsRightSideContainer">
              <div id="workSpaceContainer">
                <h2 id="workspaceTitle" className="ab-h2">
                  Your Boards
                </h2>
              </div>
              <div id="containerForRightTiles">
                {allBoards && allBoards.length > 0 ? (
                  allBoards.map((board) => (
                    <NavLink
                      key={board.id}
                      className={"ab-boards-link-right"}
                      to={`/boards/${board.id}`}
                    >
                      <div className="ab-boards-tile-right">
                        {board.board_name}
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div id="ab-create-board-button">
                    <OpenModalButton
                      buttonText="Create your first board"
                      modalComponent={<PostBoard />}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>

        {/* } */}
      </div>
    </>
  );
}

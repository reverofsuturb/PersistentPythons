import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useShowBoards } from "../../context/ShowBoards";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import { PostList } from "../Lists";
import { RiSpaceShipFill } from "react-icons/ri";
import { MdWorkspaces } from "react-icons/md";
import { thunkGetAllBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./SingleBoard.css";
import { FaTrash } from "react-icons/fa";
import { SingleList } from "../Lists/SingleList";

export default function SingleBoard() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { showBoards, setShowBoards } = useShowBoards();

  let boards = useSelector((state) => state.boards);
  let board = useSelector((state) => state.boards[board_id]);
  const post_card = useSelector((state) => state.cards);

  const length_post_card = Object.values(post_card).length;

  const allBoards = Object.values(boards);

  const [hoverCaption, setHoverCaption] = useState(null);

  const [addCard, setAddCard] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleShowAllBoards = () => {
    setShowBoards(!showBoards);
  };

  useEffect(() => {
    dispatch(thunkGetAllBoards());
  }, [dispatch, addCard, length_post_card, editing]);

  const hoverClassName = "caption" + (hoverCaption !== null ? "" : "hidden");

  return (
    <>
      <div onClick={() => handleShowAllBoards()} id="boardsTitleContainer">
        <h2>
          <RiSpaceShipFill className={showBoards ? "flip" : "unflip"} />
          Your Boards
        </h2>
      </div>
      <div id="secondHalfContainerBoards">
        {showBoards && (
          <div
            id="boardsLeftSideContainer"
            className={showBoards ? "slideDown" : "slideUp"}
          >
            {allBoards.length &&
              allBoards?.map((board) => (
                <div key={board.id} className="ab-boards-tile-left">
                  <MdWorkspaces />
                  <NavLink
                    className={"ab-boards-link-left"}
                    to={`/boards/${board.id}`}
                  >
                    {board.board_name}
                  </NavLink>
                </div>
              ))}
          </div>
        )}
        <div id="boardsRightSideContainer">
          <div className="sb-header-right-container">
            <div className="sb-edit-board">
              <div
                className="sb-eb-cap"
                onMouseEnter={() => setHoverCaption(-1)}
                onMouseLeave={() => setHoverCaption(null)}
                role="link"
              >
                {board?.board_name && (
                  <EditBoard
                    board={board}
                    editing={editing}
                    setEditing={setEditing}
                    className="sb-edit-board-modal"
                  />
                )}
              </div>
              <OpenModalMenuItem
                itemText={
                  <p
                    style={{ fontSize: "12px", color: "black" }}
                    id="sb-delete-board-button-single"
                  >
                    <FaTrash />
                  </p>
                }
                modalComponent={
                  <DeleteBoard board_id={board_id} board={board} />
                }
                role="button"
              />
              <div>
                {hoverCaption === -1 && (
                  <p className={hoverClassName}>Click to edit title</p>
                )}
              </div>
            </div>

            <div className="list-title-menu">
              <i
                className="fa-solid fa-ellipsis"
                onMouseOver={() => setHoverCaption(-1)}
                onMouseOut={() => setHoverCaption(null)}
                role="button"
              />
              {hoverCaption === "hover" && (
                <p
                  className={
                    hoverClassName + (showMenu ? setHoverCaption("") : "")
                  }
                >
                  Board Menu
                </p>
              )}
            </div>
          </div>
          <div className="sb-delete-bp-list-add">
            <div className="board-post-list">
              <PostList setEditing={setEditing} />
            </div>
          </div>
          {/* list */}
          <div className="outer-sb-list">
            <div className="sb-list-full">
              {board?.lists?.length ? (
                board?.lists?.map((list) => (
                  <SingleList
                    key={list.id}
                    list={list}
                    setEditing={setEditing}
                    editing={editing}
                  />
                ))
              ) : (
                <div className="sb-contain-two">
                  <div className="no-cards">
                    No cards yet! Add a card and get your odyssey on!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

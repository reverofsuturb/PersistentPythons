import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetBoard } from "../../store/boards";
import { thunkGetAllLists } from "../../store/lists";
import { useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import EditList from "../Lists/EditList";
import DeleteList from "../Lists/DeleteList";
import SingleCard from "../Cards/AllCards/SingleCard";
import PostCard from "../Cards/AllCards/PostCard";
import { PostList } from "../Lists";
import { RiSpaceShipFill } from "react-icons/ri";
import { MdWorkspaces } from "react-icons/md";
import { thunkGetAllBoards } from "../../store/boards";
import { thunkAllGetCardImages } from "../../store/card_images";
import { NavLink } from "react-router-dom";
import "./SingleBoard.css";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { thunkGetAllCards } from "../../store/cards";
import { SingleList } from "../Lists/SingleList";

export default function SingleBoard() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currSelectedCard, setCurrSelectedCard] = useState(null);

  let boards = useSelector((state) => state.boards);
  let board = useSelector((state) => state.boards[board_id]);
  console.log(board);
  const lists = useSelector((state) => state.lists);
  const post_card = useSelector((state) => state.cards);

  const cardImagesObj = useSelector((state) => state.cardImages);
  const cardImages = Object.values(cardImagesObj);

  const length_post_card = Object.values(post_card).length;

  const allBoards = Object.values(boards);

  const [hoverCaption, setHoverCaption] = useState(null);

  // const board = boards[board_id];
  const allLists = Object.values(lists).filter(
    (list) => list.board_id == board_id
  );
  const [addCard, setAddCard] = useState(false);

  const handleMouseOver = (cardId) => {
    setCurrSelectedCard(cardId);
    setHoverCaption(cardId);
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setCurrSelectedCard(null);
    setHoverCaption(null);
  };

  useEffect(() => {
    // dispatch(thunkGetBoard(board_id));
    dispatch(thunkGetAllBoards());
    dispatch(thunkGetAllLists());
    dispatch(thunkGetAllCards());
    dispatch(thunkAllGetCardImages());
    console.log("rerender");
  }, [dispatch, addCard, length_post_card]);
  const closeMenu = () => setShowMenu(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");

  const hoverClassName = "caption" + (hoverCaption !== null ? "" : "hidden");

  return (
    <>
      <div id="boardsTitleContainer">
        <h2>
          <RiSpaceShipFill />
          Your Boards
        </h2>
      </div>
      <div id="secondHalfContainerBoards">
        <div id="boardsLeftSideContainer">
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
                  <EditBoard board={board} className="sb-edit-board-modal" />
                )}
              </div>
              <OpenModalMenuItem
                itemText={
                  <p id="sb-delete-board-button-single">
                    <FaTrash />
                  </p>
                }
                modalComponent={
                  <DeleteBoard board_id={board_id} board={board} />
                }
                // onItemClick={closeMenu}
                role="button"
              />
              <div>
                {hoverCaption === -1 && (
                  <p className={hoverClassName}>Double click to edit title</p>
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
              <PostList />
            </div>
          </div>
          {/* list */}
          <div className="outer-sb-list">
            <div className="sb-list-full">
              {board?.lists?.length ? (
                board?.lists?.map((list) => (
                  <SingleList list={list} />
                  // <div key={list.id} className="sb-list-container">
                  //   <EditList list={list} />
                  //   {/* Cards */}
                  //   <div className="all-cards-on-list">
                  //     {list?.cards?.length > 0 ? (
                  //       list?.cards?.map((card, index) => (
                  //         <div className="indiv-card-in-list" key={card.id}>
                  //           {card && (
                  //             <>
                  //               <div className="card-modal-box">
                  //                 <div
                  //                   onMouseOver={() => handleMouseOver(card.id)}
                  //                   onMouseLeave={handleMouseLeave}
                  //                   className="card-modal-title"
                  //                   role="link"
                  //                 >
                  //                   <OpenModalMenuItem
                  //                     className="card-modal-item"
                  //                     id="card-modal-item"
                  //                     itemText={card.title}
                  //                     onItemClick={!closeMenu}
                  //                     modalComponent={
                  //                       <SingleCard
                  //                         className="card-modal"
                  //                         card={card}
                  //                         list={list}
                  //                       />
                  //                     }
                  //                   />
                  //                   {isMouseOver &&
                  //                     currSelectedCard === card.id && (
                  //                       <p className={hoverClassName}>
                  //                         {" "}
                  //                         Click to edit card
                  //                       </p>
                  //                     )}
                  //                 </div>
                  //                 <div className="card-modal-main-info">
                  //                   <div className="card-modal-cover-image">
                  //                     <img
                  //                       className="sb-image-card"
                  //                       style={{ width: 220, height: 220 }}
                  //                       src={
                  //                         cardImages?.length &&
                  //                         cardImages?.find(
                  //                           (image) => image.card_id == card.id
                  //                         )?.image_file
                  //                       }
                  //                       alt="img"
                  //                     />
                  //                   </div>
                  //                   <div className="card-modal-description">
                  //                     {card.description}
                  //                   </div>
                  //                 </div>
                  //               </div>
                  //             </>
                  //           )}
                  //         </div>
                ))
              ) : (
                <div className="sb-contain-two">
                  <div className="no-cards">
                    No cards yet! Add a card and get your odyssey on!
                  </div>
                </div>
              )}
            </div>

            <div className="add-card-div">
              {/* <PostCard list={list} /> */}
            </div>
            <div className="list-card-delete-button">
              {/* <DeleteList list={list} /> */}
            </div>
          </div>
          )) ) : (<>No Lists Created</>)
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

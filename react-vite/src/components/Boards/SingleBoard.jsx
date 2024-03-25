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
import { useModal } from "../../context/Modal";
import { RiSpaceShipFill } from "react-icons/ri";
import { MdWorkspaces } from "react-icons/md";
import { thunkGetAllBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./SingleBoard.css";
import OpenModalButton from "../OpenModalButton";

export default function SingleBoard() {
  const { board_id } = useParams();
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const [editing, setEditing] = useState(false);
  const boards = useSelector((state) => state.boards);
  const lists = useSelector((state) => state.lists);
  const post_card = useSelector((state) => state.cards);
  const sessionUser = useSelector(state => state.session.user);

  // console.log("%c 🚀 ~ file: SingleBoard.jsx:32 ~ SingleBoard ~ sessionUser: ", "color: red; font-size: 25px", sessionUser)

  const length_post_card = Object.values(post_card).length;




  const allBoards = Object.values(boards);

  const [hoverCaption, setHoverCaption] = useState(null);

  const board = boards[board_id];
  const allLists = Object.values(lists).filter(
    (list) => list.board_id == board_id
  );
  const [addCard, setAddCard] = useState(false);

  useEffect(() => {
    dispatch(thunkGetBoard(board_id));
    dispatch(thunkGetAllBoards());
    dispatch(thunkGetAllLists());
  }, [dispatch, showMenu, closeModal, addCard, length_post_card]);

  const closeMenu = () => setShowMenu(false);

  const toggleMenu = (e) => {
    e.stopPropagation();// Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");



  const hoverClassName = "caption" + (hoverCaption !== null ? "" : "hidden");

  return (
    <>
      <div id="boardsTitleContainer">
        <h2>
          <RiSpaceShipFill />
          Your Boards
        </h2>
      </div>
      <div id="secondHalfContainerBoards"
      // className="sb-outer_container"
      >
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
            <div
              className="sb-edit-board"
            >
              <div
                className="sb-eb-cap"
                onMouseEnter={() => setHoverCaption(-1)}
                onMouseLeave={() => setHoverCaption(null)}
                role="link"
              >

                {board?.board_name && (
                  <EditBoard board={board} className="sb-edit-board-modal"
                  />
                )}
              </div>
              <div>
                {hoverCaption === -1 && (
                  <p className={hoverClassName}>
                    Double click here to edit board name
                  </p>
                )}
              </div>
            </div>

            <div className="list-title-menu">
              <button
                onClick={toggleMenu}
                className="board-menu-button"
              >
                <i className="fa-solid fa-ellipsis"
                  onMouseOver={() => setHoverCaption(-1)}
                  onMouseOut={() => setHoverCaption(null)}
                  role="button"

                />
                {
                  hoverCaption === "hover" &&
                  <p className={hoverClassName + (showMenu ? (setHoverCaption("")) : "")}
                  >Board Menu</p>
                }
              </button>
              <ul className={ulClassName}>
                {sessionUser ? (
                  <>
                    <li className="profile_dropdown_manage">
                      {/* <button onClick={} className="user_manage_button">Manage Spots</button> */}
                    </li>
                    <li className="delete-opb opb">
                      <OpenModalButton
                        buttonText={"Delete Board"}
                        modalComponent={<DeleteBoard board_id={board_id} board={board} />}
                        onItemClick={closeMenu}
                        role="button"
                      />

                    </li>

                  </>
                )
                  :
                  <>
                  </>
                }
              </ul>

            </div>
          </div>

          {/* additional options */}
          <div className="sb-delete-bp-list-add">
            {/*Board Delete */}
            {/* <div className="single-board-delete">
              {board_id && (
                <button className="single-board-button-delete">
                  <OpenModalMenuItem
                    itemText={"Delete Board"}
                    onItemClick={closeMenu}
                    modalComponent={
                      <DeleteBoard board_id={board_id} board={board} />

                    }
                  />
                </button>
              )}
            </div> */}

            <div className="board-post-list">
              <PostList />
            </div>
          </div>
          {/* list */}
          <div className="outer-sb-list">
            <div className="sb-list-full">
              {allLists.length ? (
                allLists?.map((list) => (
                  <div key={list.id} className="sb-list-container"

                  >
                    <EditList list={list} />

                    {/* Cards */}
                    <div className="all-cards-on-list">
                      {list.cards_in_list.length > 0 ? (
                        list.cards_in_list.map((card, index) => (
                          <div className="indiv-card-in-list" key={card.id}>
                            {card && (
                              <>
                                <div
                                  className="card-modal-box"
                                  onMouseEnter={() => setHoverCaption(index)}
                                  onMouseLeave={() => setHoverCaption(null)}
                                >
                                  <div className="card-modal-title" role="link">
                                    <OpenModalMenuItem
                                      className="card-modal-item"
                                      id="card-modal-item"
                                      itemText={card.title}
                                      onItemClick={!closeMenu}
                                      modalComponent={
                                        <SingleCard
                                          className="card-modal"
                                          card={card}
                                          list={list}
                                        />
                                      }
                                    />
                                    {hoverCaption === index && (<p className={hoverClassName}> Double click here edit your card</p>)}
                                  </div>
                                  <div className="card-modal-main-info">
                                    <div className="card-modal-cover-image">
                                      [Enter Image Here]
                                    </div>
                                    <div className="card-modal-description">
                                      {card.description}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
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
                      <PostCard list={list} />
                    </div>
                    <div className="list-card-delete-button">
                      <DeleteList list={list} />
                    </div>
                  </div>
                ))
              ) : (
                <>No Lists Created</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetBoard } from "../../store/boards";
import { thunkGetAllLists } from "../../store/lists";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import OpenModalButton from "../OpenModalButton";
import DeleteBoard from "./DeleteBoard";
import EditList from "../Lists/EditList";
import DeleteList from "../Lists/DeleteList";
import SingleCard from "../Cards/AllCards/SingleCard";
import PostCard from "../Cards/AllCards/PostCard";
import { PostList } from "../Lists";
import "./SingleBoard.css";

export default function SingleBoard() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const boards = useSelector((state) => state.boards);
  const lists = useSelector((state) => state.lists);

  const board = boards[board_id];
  const allLists = Object.values(lists).filter(
    (list) => list.board_id == board_id
  );

  useEffect(() => {
    dispatch(thunkGetBoard(board_id));
    dispatch(thunkGetAllLists());
  }, [dispatch, board_id, showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="sb-outer_container">
        <div className="sb-inner_container">
          <div>
            {board?.board_name}
          </div>
          <div className="single-board-edit">
            {board_id && (
              <button
                className="single-board-button-edit"
                onClick={() => navigate(`/boards/${board_id}/edit`)}
              >
                Edit Board
              </button>
            )}
          </div>

          {/* additional options */}
          <div className="sb-delete-bp-list-add">

            {/*Board Delete */}
            <div className="single-board-delete">
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
            </div>
            <div className="board-post-list">
              <PostList />
            </div>
          </div>
          {/* list */}
          <div className="outer-sb-list">

            <div className="sb-list-full">
              {allLists.length ? (
                allLists?.map((list) => (
                  <div key={list.id} className="sb-list-container">
                    <h2 className="sb-lists-title">{list.title}</h2>

                    {/* Cards */}
                    <div className="all-cards-on-list">
                      {list?.cards_in_list.map((card) => (
                        <div className="indiv-card-in-list">
                          {card ? (
                            <>
                              <div
                                className="card-modal-box"
                                values="card"
                                onClick={() => console.log("CARD!!!: ", card)}
                              >
                                <div className="card-modal-title">
                                  <OpenModalMenuItem
                                    className="card-modal-item"
                                    itemText={card.title}
                                    onItemClick={!closeMenu}
                                    modalComponent={
                                      <SingleCard
                                        className="confusion"
                                        card={card}
                                        list={list}
                                      />
                                    }
                                  />
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
                          ) : (
                            <>
                              {/* insert display with 4 different card templates, each showing an added card */}
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    <button onClick={() => setShowEdit(!showEdit)}>
                      Edit List
                    </button>
                    {showEdit ? <EditList list={list} /> : null}
                    <DeleteList list={list} />
                    <OpenModalButton
                      buttonText={"Add a Card"}
                      modalComponent={<PostCard list={list} />}
                    />
                  </div>
                ))
              ) : (
                <>No Lists Created</>
              )}

              <button onClick={() => navigate(`/boards/${board_id}/lists/new`)}>
                New List
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

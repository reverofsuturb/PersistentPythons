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
  }, [dispatch, board_id]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="outer_container">
        <div className="sb-board-title">
          {board?.board_name}
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

          {/* list */}
          <div className="sb-lists-full">
            {allLists.length ? (
              allLists?.map((list) => (
                <div key={list.id} className="sb-list-container">
                  <h2 className="sb-lists-title">{list.title}</h2>

                  {/* Cards */}
                  {list?.cards_in_list.map((card) => (
                    <div>
                      <SingleCard key={card.id} card={card} list={list} />
                      {/* <div onClick={() => {
                        <OpenModalButton
                        modalComponent={<SingleCard key={card.id} card={card} list={list} />}
                        />
                      }}>{card.title}</div> */}
                    </div>
                  ))}

                  <button onClick={() => setShowEdit(!showEdit)}>
                    Edit List
                  </button>
                  {showEdit ? <EditList list={list} /> : null}
                  <DeleteList list={list} />
                  <OpenModalButton
                    buttonText={"New Card"}
                    modalComponent={<PostCard list={list} />}
                  />
                </div>
              ))
            ) : (
              <>No Lists Created</>
            )}
          </div>

          <button onClick={() => navigate(`/boards/${board_id}/lists/new`)}>
            New List
          </button>
        </div>
      </div>
    </>
  );
}

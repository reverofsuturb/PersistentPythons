import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetBoard } from "../../store/boards";
import { thunkGetAllLists } from "../../store/lists";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBoard from "./DeleteBoard";
import EditList from "../Lists/EditList/EditList";
import DeleteList from "../Lists/DeleteList/DeleteList";
import SingleCard from "../Cards/SingleCard/SingleCard";
import PostCard from "../Cards/PostCards/PostCard";

export default function SingleBoard() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPostCard, setShowPostCard] = useState(false);

  const boards = useSelector((state) => state.boards);
  const lists = useSelector((state) => state.lists);

  const board = boards[board_id];
  const allLists = Object.values(lists).filter(
    (list) => list.board_id == board_id
  );


  useEffect(() => {
    dispatch(thunkGetBoard(board_id));
    dispatch(thunkGetAllLists());
  }, [dispatch, board_id, showEdit, showPostCard]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="outer_container">
        <div className="inner_container">
          <h1>Hello</h1>
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
          <ul>
            {allLists.length ? (
              allLists?.map((list) => (
                <div key={list.id}>
                  <li>{list.title}</li>

                  {/* Cards */}
                  {list?.cards_in_list.map((card) => (
                    <SingleCard key={card.id} card={card} list={list} />
                  ))}


                  <button onClick={() => setShowEdit(!showEdit)}>Edit List</button>
                  {showEdit ? <EditList list={list} /> : null}
                  <DeleteList list={list} />
                  <button onClick={() => setShowPostCard(!showPostCard)}>
                    Post Card
                  </button>
                  {showPostCard ? <PostCard list={list} /> : null}
                </div>
              ))
            ) : (
              <>No Lists Created</>
            )}
          </ul>

          <button onClick={() => navigate(`/boards/${board_id}/lists/new`)}>
            New List
          </button>
        </div>
      </div>
    </>
  );
}

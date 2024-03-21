import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetBoard } from "../../store/boards";
import { thunkGetAllLists } from "../../store/lists";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import OpenModalButton from "../OpenModalButton";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import EditList from "../Lists/EditList";
import DeleteList from "../Lists/DeleteList";
import SingleCard from "../Cards/AllCards/SingleCard";
import PostCard from "../Cards/AllCards/PostCard";
import PostList from "../Lists/PostLists";
import "./SingleBoard.css";

export default function SingleBoard() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // const [editing, setEditing] = useState(false);
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
        <div>
          {board?.board_name && <EditBoard board={board}/>}
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
          {/* <div className="sb-lists-wide"> */}
          <div className="sb-lists-full">
            {allLists.length ? (
              allLists?.map((list) => (
                <div key={list.id} className="sb-list-container">
                  <EditList list={list} />

                  {/* Cards */}
                  {list?.cards_in_list.map((card) => (
                    <SingleCard key={card.id} card={card} list={list} />
                  ))}
                  <DeleteList list={list} />
                  <OpenModalButton
                    buttonText={"New Card"}
                    modalComponent={<PostCard list={list} />}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
            <PostList />
          </div>
          {/* </div> */}
          <button onClick={() => navigate(`/boards/${board_id}/lists/new`)}>
            New List
          </button>
        </div>
      </div>
    </>
  );
}

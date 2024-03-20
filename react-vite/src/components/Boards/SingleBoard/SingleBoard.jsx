// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { thunkGetBoard } from "../../../store/boards";
// import { useNavigate, useParams } from "react-router-dom";
// import "./SingleBoard.css";
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
// import DeleteBoard from "../DeleteBoards/DeleteBoard";

// export default function SingleBoard() {

//     const { board_id } = useParams();
//     console.log("%c 🚀 ~ file: SingleBoard.jsx:14 ~ SingleBoard ~ board_id: ", "color: red; font-size: 25px", board_id)

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showMenu, setShowMenu] = useState(false);

//     const boards = useSelector((state) => state.boards);

//     console.log("%c 🚀 ~ file: SingleBoard.jsx:18 ~ SingleBoard ~ boards: ", "color: yellow; font-size: 25px", boards, Object.values(boards))

//     const board = boards[board_id]

//     console.log("%c 🚀 ~ file: SingleBoard.jsx:22 ~ SingleBoard ~ board: ", "color: gold; font-size: 25px", board)

//     // const boardObject = Object.values(board)

//     useEffect(() => {
//         dispatch(thunkGetBoard(board_id))

//     }, [dispatch, board_id, showMenu]);

//     const closeMenu = () => setShowMenu(false)

//     if (!board) return null;

//     return (
//         <>
//             <div className="outer_container">
//                 <div className="inner_container">

//                     <h1>Hello</h1>
//                     {board?.board_name}
//                     <div className="single-board-edit">
//                         {
//                             board_id && (

//                                 <button className="single-board-button-edit"
//                                     onClick={() => navigate(`/boards/${board_id}/edit`)}
//                                 >
//                                     Edit Board
//                                 </button>
//                             )
//                         }
//                     </div>
//                     <div className="single-board-delete">
//                         {
//                             board_id && (

//                                 <button className="single-board-button-delete"

//                                 >
//                                     <OpenModalMenuItem
//                                         itemText={"Delete"}
//                                         onItemClick={closeMenu}
//                                         modalComponent={
//                                             <DeleteBoard
//                                                 board_id={board_id}
//                                                 board={board}
//                                             />
//                                         }
//                                     />
//                                 </button>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetBoard } from "../../../store/boards";
import { thunkGetAllLists } from "../../../store/lists";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteBoard from "../DeleteBoards/DeleteBoard";
import EditList from "../../Lists/EditList/EditList";
import DeleteList from "../../Lists/DeleteList/DeleteList";
import SingleCard from "../../Cards/SingleCard/SingleCard";

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
          <div className="single-board-delete">
            {board_id && (
              <button className="single-board-button-delete">
                <OpenModalMenuItem
                  itemText={"Delete"}
                  onItemClick={closeMenu}
                  modalComponent={
                    <DeleteBoard board_id={board_id} board={board} />
                  }
                />
              </button>
            )}
          </div>
          <ul>
            {allLists.length &&
              allLists?.map((list) => (
                <div>
                  <li key={list.id}>{list.title}</li>
                  {list?.cards_in_list.map((card) => (
                    <SingleCard card={card} />
                  ))}
                  <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
                  {showEdit ? <EditList list={list} /> : null}
                  <DeleteList list={list} />
                </div>
              ))}
          </ul>
          <button onClick={() => navigate(`/boards/${board_id}/lists/new`)}>
            New List
          </button>
        </div>
      </div>
    </>
  );
}

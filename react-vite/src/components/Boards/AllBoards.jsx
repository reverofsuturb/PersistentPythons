import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./AllBoards.css"

export default function AllBoards() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const allBoards = Object.values(boards);

  useEffect(() => {
    dispatch(thunkGetAllBoards());
  }, [dispatch]);

  return (
    <>
      <div className="ab-outer_container">
        <div className="ab-inner_container">

          <h2 className="ab-boards-title">Your Boards</h2>
          <div className="ab-boards-container">
            {allBoards.length &&
              allBoards?.map((board) => (
                <div className="ab-boards-tile">
                  <NavLink className={"ab-boards-link"} to={`/boards/${board.id}`}>{board.board_name}</NavLink>
                </div>
              ))}
          </div>
        </div>
      </div>

    </>
  );
}

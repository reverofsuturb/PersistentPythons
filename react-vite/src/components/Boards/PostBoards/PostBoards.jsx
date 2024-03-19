import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostBoard } from "../../../store/boards";
import { useNavigate } from "react-router-dom";

export default function PostBoards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const board = {
      board_name: boardName,
    };

    const newBoard = await dispatch(thunkPostBoard(board));
    console.log(newBoard, "NEW BOARD");
    if (newBoard && newBoard.errors) {
      return setErrors(newBoard.errors);
    }
    navigate(`/boards/${newBoard.board.id}`)
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}

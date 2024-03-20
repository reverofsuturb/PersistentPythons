import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostBoard } from "../../../store/boards";
import { useNavigate } from "react-router-dom";
import "./PostBoard.css";




export default function PostBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errorsObject = {}

    boardName.length < 5 ? errorsObject.boardName = "Board name is required" : null

    setErrors(errorsObject)

  }, [boardName])

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
    <>
      <div className="outer-post_container">

      <div className="inner-post_container">
        <form onSubmit={onSubmit}>
          <label>
            Name
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              />
            <p className="p-error">{errors?.boardName}</p>
          </label>

          <button>Submit</button>
        </form>
        </div>

    </div>
    </>
  );
}

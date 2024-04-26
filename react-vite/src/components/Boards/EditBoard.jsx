import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./EditBoard.css";
import { thunkPutBoard } from "../../store/boards";

export default function EditBoard({ board, setEditing }) {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const name_board = board?.board_name;
  const [boardName, setBoardName] = useState(name_board);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    const updatedBoard = {
      board_name: boardName,
    };

    const res = await dispatch(thunkPutBoard(updatedBoard, board_id));

    if (res && res.errors) {
      return setErrors(res.errors);
    }
    setEditing(false);
  };

  useEffect(() => {
    const errorsObject = {};

    boardName.length < 5
      ? (errorsObject.boardName = "Board name is required")
      : null;
    boardName.length > 20
      ? (errorsObject.boardName = "Board name exceeds capacity")
      : null;

    setErrors(errorsObject);
  }, [boardName]);

  return (
    <>
      <h2
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="eb-board-title"
        value={boardName}
        onBlur={handleSubmit}
        onInput={(e) => setBoardName(e.currentTarget.innerText)}
      >
        {board.board_name}
      </h2>
      {(errors?.board_name && (
        <p className="p-error">{errors.board_name}</p>
      )) || <p className="p-error">{errors.boardName}</p>}
    </>
  );
}

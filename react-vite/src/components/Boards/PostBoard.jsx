import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkPostBoard } from "../../store/boards";
import "./PostBoard.css";
import { useModal } from "../../context/Modal";

export default function PostBoard() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();


  const boards = useSelector(state => state.boards);


  const board = boards[board_id];
  const arrBoard = Object.values(board);
  const name_board = arrBoard[0];

  const [boardName, setBoardName] = useState(name_board);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const errorsObject = {};

    boardName.length < 5
      ? (errorsObject.boardName = "Board name is required")
      : null;
    boardName.length > 20 ? (errorsObject.boardName = "Board name exceeds capacity") : null

    setErrors(errorsObject);
  }, [boardName]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const postingBoard = {
      board_name: boardName,
    };

    const res = await dispatch(thunkPostBoard(postingBoard));

    if (res && res.errors) {
      return setErrors(res.errors);
    }
    closeModal();


    navigate(`/boards/${res.board.id}`);
  };

  return (
    <div className="postBoardForm">
      <div className="outer-post_container">
        <form onSubmit={onSubmit}>
          <h2>New Mission Board</h2>
          <div id="formBoardLabel">
            Board Title
            <label>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
              {errors?.board_name && (
                <p className="p-error">{errors.board_name}</p>
              ) || (
                <p className="p-error">{errors?.boardName}</p>
              )}
            </label>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

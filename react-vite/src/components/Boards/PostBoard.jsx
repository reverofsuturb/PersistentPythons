import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkPostBoard } from "../../store/boards";
import "./PostBoard.css";
import { useModal } from "../../context/Modal";

export default function PostBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [boardName, setBoardName] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    if (boardName.length == 0 ) {
      setErrors({ boardName: "Board's name is required" });
      return;
    } else if (boardName.length > 100) {
      setErrors({ boardName: "Board's name must be shorter than 100 characters long." });
      return;
    }

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
              {(errors?.board_name && (
                <p className="p-error">{errors.board_name}</p>
              )) || <p className="p-error">{errors?.boardName}</p>}
            </label>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

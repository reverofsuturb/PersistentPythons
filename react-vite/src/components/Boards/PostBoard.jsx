import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { thunkPostBoard } from "../../store/boards";
import "./PostBoard.css";
import { useModal } from "../../context/Modal";

export default function PostBoard() {
  // const { board_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [boardName, setBoardName] = useState("");
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   const errorsObject = {};

  //   boardName.length < 5
  //     ? (errorsObject.boardName = "Board name is required")
  //     : null;

  //   setErrors(errorsObject);
  // }, [boardName]);

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

    // const newPost = Object.values(res);
    // console.log(newPost, newPost[1].id);

    navigate(`/boards/${res.board.id}`);
  };

  return (
    <>
      <div className="outer-post_container">
        <div className="postBoardForm">
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
                )}
              </label>
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

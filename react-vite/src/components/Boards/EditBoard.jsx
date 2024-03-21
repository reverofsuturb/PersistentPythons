import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./EditBoard.css";
import { thunkPutBoard } from "../../store/boards";

export default function EditBoard() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const board = useSelector((state) => state.boards[board_id]);

  const [boardName, setBoardName] = useState(board?.board_name);
  const [errors, setErrors] = useState({});
  console.log(errors);
  console.log(
    "%c 🚀 ~ file: EditBoard.jsx:15 ~ EditBoard ~ board: ",
    "color: green; font-size: 25px",
    board
  );

  // useEffect(() => {
  //   // const errorsObject = {};

  //   // boardName.length < 5 ? errorsObject.boardName = "Board name is required" : null

  //   // setErrors(errorsObject);
  // }, [boardName]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedBoard = {
      board_name: boardName,
    };

    const res = await dispatch(thunkPutBoard(updatedBoard, board_id));

    console.log(
      "%c 🚀 ~ file: EditBoard.jsx:44 ~ onSubmit ~ NEW RESPONSE: ",
      "color: orange; font-size: 25px",
      res
    );

    if (res && res.errors) {
      return setErrors(res.errors);
    }
    navigate(`/boards/${board_id}`);
  };

  return (
    <>
      <div className="outer-edit_container">
        <div className="inner-edit_container">
          <form action="" onSubmit={onSubmit}>
            <label>
              Name
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Enter a Board Name"
              />
              {errors?.board_name && (
                <p className="p-error">{errors.board_name}</p>
              )}
            </label>

            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

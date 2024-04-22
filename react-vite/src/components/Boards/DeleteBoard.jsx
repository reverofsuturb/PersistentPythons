import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { thunkDeleteBoard, thunkGetBoard } from "../../../../store/boards";
import { thunkDeleteBoard, thunkGetBoard } from "../../store/boards";
import { useModal } from "../../context/Modal";

import "./DeleteBoard.css";

export default function DeleteBoard({ board_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();

    setShowMenu(!showMenu);
  };

  const handleDelete = async (board_id) => {
    try {
      await dispatch(thunkDeleteBoard(board_id));
      navigate("/boards");
    } catch (error) {
      return "Why are you like this", error;
    }
  };

  const noDeletion = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(thunkGetBoard(board_id));
  }, [dispatch, board_id]);

  return (
    <>
      {/* <div className="outer-delete_container"> */}
      {/* <div className="inner-delete_container"> */}
      <h1>Confirm Delete</h1>
      <form action="" onClick={toggleMenu}>
        <div className="delete-board-modal-pop">
          <button
            className="delete-board-button"
            onClick={() => {
              handleDelete(board_id);
              navigate("/boards");
            }}
          >
            Yes (Delete Board)
          </button>
          <button className="delete-board-button" onClick={() => noDeletion()}>
            {" "}
            No (Go Back)
          </button>
        </div>
      </form>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

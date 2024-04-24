import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkDeleteBoard } from "../../store/boards";
import { useModal } from "../../context/Modal";
import './DeleteBoard.css'

export default function DeleteBoard({ board_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();

    setShowMenu(!showMenu);
  };

  const handleDelete = async (e, board_id) => {
    e.preventDefault();
    const res = await dispatch(thunkDeleteBoard(board_id));
    if (res && res.errors) {
      return res.errors;
    }
    navigate("/boards");
    closeModal();
  };

  const noDeletion = () => {
    closeModal();
  };

  return (
    <div className="delete-board-modal-container">
      <h1 style={{marginTop: '0px'}}>Confirm Delete</h1>
      <form action="" onClick={toggleMenu}>
        <div className="delete-board-modal-pop">
          <button
            className="delete-board-button"
            onClick={(e) => {
              handleDelete(e, board_id);
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
    </div>
  );
}

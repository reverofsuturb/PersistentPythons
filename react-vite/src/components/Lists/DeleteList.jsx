import { useDispatch } from "react-redux";
import { thunkDeleteList } from "../../store/lists";
import { useModal } from "../../context/Modal";

import "./DeleteList.css";

export default function DeleteList({ list, setEditing }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    const res = await dispatch(thunkDeleteList(list.id));
    if (res && res.errors) {
      return res.errors;
    }
    setEditing(false);
    closeModal();
  };

  return (
    <>
      <div className="ec-cards-delete-modal">
        <h2 className="ec-cards-modal-title">Confirm Delete</h2>
        <p className="ec-comments-modal-p">
          Are you sure you want to remove this List?
        </p>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="ec-cards-modal-button">
            Yes
          </button>
          <button
            className="ec-cards-modal-button"
            onClick={() => closeModal()}
          >
            No
          </button>
        </form>
      </div>

      {/* <form id="delete-list-button-container" onSubmit={handleSubmit}>
        <button
          id="delete-list-button"
          style={{ fontSize: "12px", color: "white" }}
          type="submit"
        >
          <FaTrash />
        </button>
      </form> */}
    </>
  );
}

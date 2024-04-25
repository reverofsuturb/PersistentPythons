import { useModal } from "../../../context/Modal";
import { thunkDeleteCard } from "../../../store/cards";
import { useDispatch } from "react-redux";
import "./DeleteCard.css";

export default function DeleteCard({ card }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    const res = await dispatch(thunkDeleteCard(card.id));

    if (res && res.errors) {
      console.log(res.errors);
    }

    closeModal();
  };

  return (
    <div className="ec-cards-delete-modal">
      <h2 className="ec-cards-modal-title">Confirm Delete</h2>
      <p className="ec-comments-modal-p">
        Are you sure you want to remove this comment?
      </p>
      <form onSubmit={handleDelete}>
        <button type="submit" className="ec-cards-modal-button">
          Yes
        </button>
        <button className="ec-cards-modal-button" onClick={() => closeModal()}>
          No
        </button>
      </form>
    </div>
  );
}

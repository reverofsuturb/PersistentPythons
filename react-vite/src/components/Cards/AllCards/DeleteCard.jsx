import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkEditCard } from "../../../store/cards";
import { useModal } from "../../../context/Modal";
import { thunkDeleteCard } from "../../../store/cards";
import "./DeleteCard.css";

export default function DeleteCard({card}) {
  const card_id = card.id;
  console.log("🚀 ~ DeleteCard ~ card_id:", card_id)
  // const getCard = useSelector(state => state.boards)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();

    // setShowMenu(!showMenu);
  };

  const handleDelete = async (e) => {
    e.preventDefault()

    const res = await dispatch(thunkDeleteCard(card.id));
    console.log("🚀 ~ handleDelete ~ res:", res)

    if (res && res.errors){
      console.log(res.errors)
    }

    // navigate(`/boards/${board_id}`)
    closeModal()
  };

  // const noDeletion = (e) => {
  //   e.preventDefault();

  //   closeModal();
  // };

  // useEffect(() => {

  // 	dispatch(thunkGetBoard(list.board_id))

  // }, [dispatch, list.board_id])

  return (
    <div className="ec-cards-delete-modal">
      <h2 className="ec-cards-modal-title">Confirm Delete</h2>
      <p className="ec-comments-modal-p">
        Are you sure you want to remove this comment?
      </p>
      <form onSubmit={handleDelete}>
        <button
          type="submit"
          className="ec-cards-modal-button"
        >
          Yes
        </button>
        <button className="ec-cards-modal-button" onClick={()=> closeModal()}>
          No
        </button>
      </form>
    </div>
  );
}

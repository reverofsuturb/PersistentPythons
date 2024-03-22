import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkPostCard } from "../../../store/cards";
import { thunkGetBoard } from "../../../store/boards";
import "./PostCard.css";
import { useModal } from "../../../context/Modal";



export default function PostCard({ list }) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const postCard = {
      title
    };

    const res = await dispatch(thunkPostCard(list.id, postCard));


    if (res && res.errors) {

      return setErrors(res.errors);
    }


    setTitle("");
    closeModal();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowSubmit(!showSubmit);
  };

  const closeMenu = () => setShowSubmit(false);

  useEffect(() => {
    dispatch(thunkGetBoard(list.board_id))
    if (!showSubmit) return;


    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu)

  }, [dispatch, list.board_id, showSubmit])

  return (
    <>
      {showSubmit === false ? (
        <button
          type="button"
          className="pl-lists-button"
          onClick={toggleMenu}
        >
          Add a Card
        </button>
      ) : (
        <div className="pl-lists-container">
          <form className="pl-lists-form" onSubmit={handleSubmit}>
            <label className="pl-lists-label">
              <input
                className="pl-lists-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a card title"
                onClick={(e) => e.stopPropagation()}
              />
            </label>
            <div className="pl-lists-button-container">
              <p className="p-error">{errors?.title}</p>
              <button type="submit" className="pl-lists-submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

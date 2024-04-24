import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkPostCard } from "../../../store/cards";
import { useModal } from "../../../context/Modal";
import "./PostCard.css";

export default function PostCard({ list, setEditing  }) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  setEditing(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length == 0) {
      setErrors({ title: "Card title is required" });
      return;
    } else if (title.length > 50) {
      setErrors({
        title: "Card's title must be shorter than 50 characters long.",
      });
      return;
    }

    const postCard = {
      title,
    };

    const res = await dispatch(thunkPostCard(list.id, postCard));

    if (res && res.errors) {
      setErrors(res.errors);
      setEditing(false);
      return;
    }

    setTitle("");
    setEditing(false);
    closeModal();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowSubmit(!showSubmit);
  };

  const closeMenu = () => setShowSubmit(false);

  useEffect(() => {
    if (!showSubmit) return;

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, list.board_id, showSubmit]);

  return (
    <>
      <button
        type="button"
        className="pl-cards-button"
        onClick={toggleMenu}
        style={{ display: showSubmit ? "none" : "block" }}
      >
        Add a Card
      </button>
      <div
        className="pl-cards-container"
        style={{ display: showSubmit ? "block" : "none" }}
      >
        <form className="pl-cards-form" onSubmit={handleSubmit}>
          <label className="pl-cards-label">
            <input
              className="pl-cards-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a card title"
              onClick={(e) => e.stopPropagation()}
            />
          </label>
          <div className="pl-cards-button-container">
            <p className="p-error">{errors?.title}</p>
            <button type="submit" className="pl-cards-submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

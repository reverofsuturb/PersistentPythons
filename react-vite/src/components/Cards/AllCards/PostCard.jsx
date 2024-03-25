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
      return;
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
    dispatch(thunkGetBoard(list.board_id));
    if (!showSubmit) return;

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, list.board_id, showSubmit]);

  return (
    <>
      <button
        type="button"
        className="pl-lists-button"
        onClick={toggleMenu}
        style={{ display: showSubmit ? "none" : "block" }}
      >
        Add a Card
      </button>
      <div
        className="pl-lists-container"
        style={{ display: showSubmit ? "block" : "none" }}
      >
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
    </>
  );
}

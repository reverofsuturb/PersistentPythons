import {  useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkPostCard } from "../../../store/cards";
import { thunkGetBoard } from "../../../store/boards";
import "./PostCard.css";

export default function PostCard({ list }) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const dispatch = useDispatch();

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
    // setShowSubmit(false);
    // await dispatch(thunkGetCard(res.card.id))
  };

  useEffect(() => {
    dispatch(thunkGetBoard(list.board_id))

  }, [dispatch, list.board_id])

  return (
    <>
      {showSubmit === false ? (
        <button
          type=""
          className="pl-lists-button"
          onClick={() => setShowSubmit(!showSubmit)}
        >
          Add a Card
        </button>
      ) : (
        <div
          className="pl-lists-container"
          onMouseLeave={() => setTimeout(() => setShowSubmit(false), 1000)}
        >

          <form className="pl-lists-form" onSubmit={handleSubmit}>
            <label className="pl-lists-label"
            // htmlFor="title"
            >
              <input
                className="pl-lists-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a card title"
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

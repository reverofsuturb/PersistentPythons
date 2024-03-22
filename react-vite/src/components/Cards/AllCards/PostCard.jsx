import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkPostCard, thunkGetCard } from "../../../store/cards";
import { useNavigate, useParams } from "react-router-dom";
import "./PostCard.css";

export default function PostList({list}) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postCard = {
      title: title,
    };

    const res = await dispatch(thunkPostCard(list.id, postCard));

    if (res && res.errors) {
      console.log("🚀 ~ handleSubmit ~ res.errors:", res.errors)
      return setErrors(res.errors);
    }
    console.log("🚀 ~ handleSubmit ~ res.id:", res.card.id)
    console.log("🚀 ~ handleSubmit ~ res:", res)


    setTitle("");
    setShowSubmit(false);
    await dispatch(thunkGetCard(res.card.id))
  };

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
            <label className="pl-lists-label" htmlFor="title">
              <input
                className="pl-lists-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a card title"
              />
            </label>
            <div className="pl-lists-button-container">
              <p className="p-error">{errors?.title}</p>{" "}
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

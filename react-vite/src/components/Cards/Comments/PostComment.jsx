import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkPostComment } from "../../../store/comments";

import "./PostComment.css";

export default function PostComment({ card }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const showButton = body !== "";

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newComment = {
      body,
    }
    const res = await dispatch(thunkPostComment(card.id, newComment));
    if (res && res.errors) {
      return setErrors(res.errors)
    }
    setBody("")
  };

  return (
    <div>
      <form className="pc-comments-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="body" className="pc-comments-title">
            <input
              className="input-transition"
              type="text"
              value={body}
              placeholder="Write a comment..."
              onChange={(e) => setBody(e.target.value)}
            />
            {errors?.body && <p className="p-error">{errors.body}</p>}
          </label>
          {showButton && <button className="pc-button">Submit</button>}
        </div>
      </form>
    </div>
  );
}

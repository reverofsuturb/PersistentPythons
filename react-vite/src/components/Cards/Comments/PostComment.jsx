import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkPostComment } from "../../../../store/comments";

import "./PostComment.css";

export default function PostComment({ card }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newComment = {
      body,
    }
    const res = await dispatch(thunkPostComment(card.id, newComment));
    console.log(res)
    if (res && res.errors) {
      return setErrors(res.errors)
    }


  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="body">
          Submit a Comment:
          <input type="text" onChange={(e) => setBody(e.target.value)} />
          {errors?.body && <p className="p-error">{errors.body} </p>}
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

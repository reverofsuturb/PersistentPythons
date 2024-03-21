import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { thunkDeleteComment } from "../../../store/comments";



export default function DeleteComment({ comment }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  const handleSubmit = () => {
    console.log("res")
    const res = dispatch(thunkDeleteComment(comment.id));
    if (res && res.errors) {
      return res.errors;
    }
    console.log(res);
    return res;
  };

  return (
    <>

      <form onSubmit={handleSubmit}>
        {user.id === comment.user_id &&
          <button>Delete Comment</button>
        }
      </form>
    </>
  );
}

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteComment } from "../../../../store/comments";
import { useModal } from "../../../../context/Modal";

import "./DeleteComment.css";

export default function DeleteComment({ comment }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  return (
    <>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this comment?</p>
      <button
        onClick={() => {
          dispatch(thunkDeleteComment(comment.card_id, comment.id));
          closeModal();
        }}
      >
        Yes
      </button>
      <button onClick={() => closeModal()}>No</button>
    </>
  );
}

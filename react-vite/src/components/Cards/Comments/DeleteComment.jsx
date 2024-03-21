import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkDeleteComment } from "../../../store/comments";

import "./DeleteComment.css";

export default function DeleteComment({ comment }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  return (
    <div className="dc-comments-delete-modal">
      <h2 className="dc-comments-modal-title">Confirm Delete</h2>
      <p className="dc-comments-modal-p">
        Are you sure you want to remove this comment?
      </p>
      <button
        className="dc-comments-modal-button"
        onClick={() => {
          dispatch(thunkDeleteComment(comment.card_id, comment.id));
          closeModal();
        }}
      >
        Yes
      </button>
      <button className="dc-comments-modal-button" onClick={() => closeModal()}>
        No
      </button>
    </div>
  );
}

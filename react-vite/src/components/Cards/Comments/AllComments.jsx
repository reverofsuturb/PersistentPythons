import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllComments } from "../../../store/comments";
import DeleteComment from "./DeleteComment";
import OpenModalButton from "../../OpenModalButton";

import "./AllComments.css";

export default function AllComments({ card }) {
  const dispatch = useDispatch();
  const commentsObj = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user);
  console.log("🚀 ~ AllComments ~ user:", user)
  const comments = Object.values(commentsObj);

  console.log("🚀 ~ AllComments ~ comments:", comments);

  useEffect(() => {
    dispatch(thunkGetAllComments(card.id));
  }, [dispatch]);

  return (
    <>
      <h2 className="ac-comments-title">Comments:</h2>
      {comments.length &&
        comments?.map((comment) => (
          <div key={comment.id}>
            <p>{comment.user_id === user.id ? user.username : users[comment.user_id].username}</p>
            <p className="ac-comments-row">{comment?.body}</p>
            <OpenModalButton
              buttonText="Delete Comment"
              modalComponent={<DeleteComment comment={comment} />}
            />
          </div>
        ))}
    </>
  );
}

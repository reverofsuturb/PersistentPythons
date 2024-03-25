import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllComments } from "../../../store/comments";
import DeleteComment from "./DeleteComment";
import OpenModalButton from "../../OpenModalButton";
import { FaRegComment } from 'react-icons/fa';


import "./AllComments.css";

export default function AllComments({ card }) {
  const dispatch = useDispatch();
  const commentsObj = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user);
  const comments = Object.values(commentsObj);


  useEffect(() => {
    dispatch(thunkGetAllComments(card.id));
  }, [dispatch]);

  return (
    <>
      <h2 className="ac-comments-title">Comments:</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment-container">
            <div>
              <FaRegComment />
            </div>
            <div className="comment-info">
              <h4 style={{fontWeight:'900', marginTop:'0px', marginBottom:'5px'}}>{comment.user_id === user.id ? user?.username : null}</h4>
              <span className="ac-comments-row">{comment?.body}</span>
              <div className='thisisbutton'>
                <OpenModalButton
                  buttonText="Delete Comment"
                  modalComponent={<DeleteComment comment={comment} />}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Sure is empty in here, shout into the void!</p>
      )}
    </>
  );

}

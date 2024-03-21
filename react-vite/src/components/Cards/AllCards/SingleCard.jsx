import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import AllComments from "../Comments/AllComments";
import { thunkPostComment } from "../../../store/comments";
import "./SingleCard.css";

export default function SingleCard({ card, list }) {
  const [newComment, setNewComment] = useState("");


  const dispatch = useDispatch();
  const [showEditCard, setShowEditCard] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);


  const closeMenu = () => setShowEditCard(false)

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    dispatch(thunkPostComment(card.id, { body: newComment }));

    setNewComment("");
  };


  return (
    <>
      <div>

        <div className="sc-container">
          <h2 className="sc-title">{card.title}</h2>
          <div className="sc-row">Labels: {card.labels}</div>
          <div className="sc-row">Notification: {card.notification}</div>
          <div className="sc-row">Description: {card.description}</div>
          <div className="sc-row">Start Date: {card.start_date}</div>
          <div className="sc-row">End Date: {card.end_date}</div>
          <div className="sc-row">Checklist: {card.checklist}</div>
          <div>
            {
              card.id &&
              <div>
                <button onClick={() =>
                  setShowEditCard(!showEditCard)}
                >
                    <OpenModalMenuItem
                    className="single-edit-card-modal"
                      itemText={"Edit Card"}
                      onItemClick={closeMenu}
                      modalComponent={<EditCard card={card} list={list} />}
                    />
                </button>


                <button onClick={() =>
                  setShowEditCard(!showEditCard)}
                >
                    <OpenModalMenuItem
                    className="single-edit-card-modal"
                      itemText={"Delete Card"}
                      onItemClick={closeMenu}
                      modalComponent={<DeleteCard card={card} list={list} />}
                    />
                </button>

              </div>
            }
          </div>
        <div>
          <AllComments card={card}/>
        </div>
        <div>
      <button onClick={() => setShowCommentBox(!showCommentBox)}>
        Add Comment
      </button>
      {showCommentBox && (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
        </div>
      </div>
    </>
  );
}

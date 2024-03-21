import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import AllComments from "../Comments/AllComments";
import PostComment from "../Comments/PostComment";
import "./SingleCard.css";

export default function SingleCard({ card, list }) {
  const dispatch = useDispatch();

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
            {card.id && (
              <div>
                <OpenModalButton
                  buttonText={"Edit Card"}
                  modalComponent={<EditCard card={card} list={list} />}
                />

                <OpenModalButton
                  buttonText={"Delete Card"}
                  modalComponent={<DeleteCard card={card} list={list} />}
                />
              </div>
            )}
          </div>
          <div>
            <AllComments card={card} />
            <PostComment card={card} />
          </div>
        </div>
      </div>
    </>
  );
}

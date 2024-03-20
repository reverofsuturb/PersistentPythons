import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./SingleCard.css";

export default function SingleCard({ card }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="sc-container">
        <h2 className="sc-title">{card.title}</h2>
        <div className="sc-row">Labels: {card.labels}</div>
        <div className="sc-row">Notification: {card.notification}</div>
        <div className="sc-row">Description: {card.description}</div>
        <div className="sc-row">Start Date: {card.start_date}</div>
        <div className="sc-row">End Date: {card.end_date}</div>
        <div className="sc-row">Checklist: {card.checklist}</div>
      </div>
    </>
  );
}

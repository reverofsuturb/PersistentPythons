import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import EditCard from "../EditCards/EditCard";
import "./SingleCard.css";

export default function SingleCard({ card, list }) {

  console.log("%c 🚀 ~ file: SingleCard.jsx:8 ~ SingleCard ~ card: ", "color: yellow; font-size: 25px", card, card.id)

  const dispatch = useDispatch();
  const [showEditCard, setShowEditCard] = useState(false);

const closeMenu = () => setShowEditCard(false)


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
            }
          </div>
        </div>
      </div>
    </>
  );
}

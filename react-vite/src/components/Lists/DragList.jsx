import { ItemTypes } from "../Constants";
import { useDrop } from "react-dnd";
import { useState, useEffect } from "react";
import { DragCard } from "../Cards/AllCards/DragCard";
import { useDispatch } from "react-redux";
import { thunkDeleteCard, thunkPostCard } from "../../store/cards";

export const DragList = ({ list }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    hover: (item, monitor) => {},
    drop: async (droppedItem, monitor) => {
      let listId = list.id
      console.log(listId, "listId")
      const droppedCard = droppedItem.card;
      console.log("Dropped", droppedCard);
      await dispatch(thunkDeleteCard(droppedCard.id));
      dispatch(thunkPostCard(listId, droppedCard));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  console.log(isOver);
  return (
    <div className="sb-list-container" ref={drop}>
      DROP HERE
      <div>
        {list.title}
        {list.id}
      </div>
      <div>
        {list.cards_in_list.length > 0 &&
          list.cards_in_list.map((card, index) => (
            <div className="indiv-card-in-list" key={card.id}>
              {card && <DragCard card={card} />}
            </div>
          ))}
      </div>
    </div>
  );
};

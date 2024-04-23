import { DnDCard } from "../Cards/AllCards/DnDCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
export const DnDList = ({ list }) => {
  return (
    <Droppable droppableId={list.id.toString()}>
      {(provided, snapshot) => (
        <div
          className="sb-list-container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>{list.title}</div>
          <div>{list.id}</div>
          {list.cards.map((card, index) => (
            <Draggable
              key={card.id}
              draggableId={card.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  className="indiv-card-in-list"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <DnDCard card={card} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

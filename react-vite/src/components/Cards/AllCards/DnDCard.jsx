// import { thunkDeleteCard, thunkPostCard } from "../../../store/cards";
import { Draggable } from "react-beautiful-dnd";
export const DnDCard = ({ card }) => {
  return (
    <Draggable>
      <div>{card.title}</div>
    </Draggable>
  );
};

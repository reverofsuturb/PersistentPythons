import { DnDCard } from "../Cards/AllCards/DnDCard";
export const DnDList = ({ list }) => {
  return (
    <Droppable>
      <div>{list.title}</div>
      {list.cards_in_list.map((card) => (
        <DnDCard card={card} />
      ))}
    </Droppable>
  );
};

import { useDrag } from "react-dnd";
import { ItemTypes } from "../../Constants";

export const DragCard = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  // const [{ opacity }, dragRef] = useDrag(() => ({}));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: "2rem",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {card.title}
    </div>
  );
};

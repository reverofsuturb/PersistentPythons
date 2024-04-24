import SingleCard from "./SingleCard";
import OpenCardModalMenuItem from "./OpenCardModalMenuItem";
import { useModal } from "../../../context/Modal";
export const CardSticker = ({ card, list, setEditing }) => {
  const { closeMenu } = useModal();
  return (
    <div>
      <OpenCardModalMenuItem
        className="card-modal-item"
        id="card-modal-item"
        itemText={card.title}
        onItemClick={!closeMenu}
        card={card}
        modalComponent={
          <SingleCard className="card-modal" card={card} list={list} setEditing={setEditing} />
        }
      />
    </div>
  );
};

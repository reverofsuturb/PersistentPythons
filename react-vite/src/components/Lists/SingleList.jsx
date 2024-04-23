import EditList from "./EditList";
import DeleteList from "./DeleteList";
import PostCard from "../Cards/AllCards/PostCard";
import { CardSticker } from "../Cards/AllCards/CardSticker";

export const SingleList = ({ list }) => {
  return (
    <div className="sb-list-container">
      <EditList list={list} />
      {list.cards.map((card) => (
        <CardSticker card={card} list={list} />
      ))}
      <PostCard list={list} />
      <DeleteList list={list} />
    </div>
  );
};

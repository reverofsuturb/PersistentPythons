import EditList from "./EditList";
import DeleteList from "./DeleteList";
import PostCard from "../Cards/AllCards/PostCard";
import { CardSticker } from "../Cards/AllCards/CardSticker";

export const SingleList = ({ list, setEditing }) => {
  return (
    <div className="sb-list-container">
      <EditList list={list} setEditing={setEditing}/>
      {list.cards.map((card) => (
        <CardSticker card={card} list={list} />
      ))}
      <PostCard list={list} setEditing={setEditing}/>
      <DeleteList list={list} setEditing={setEditing}/>
    </div>
  );
};

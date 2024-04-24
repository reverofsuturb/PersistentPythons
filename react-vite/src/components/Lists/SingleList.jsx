import EditList from "./EditList";
import DeleteList from "./DeleteList";
import PostCard from "../Cards/AllCards/PostCard";
import { CardSticker } from "../Cards/AllCards/CardSticker";
import "./SingleList.css";

export const SingleList = ({ list, setEditing , editing }) => {
  return (
    <div className="sb-list-container">
      <EditList list={list} setEditing={setEditing} />
      {list.cards.map((card) => (
        <CardSticker card={card} list={list} setEditing={setEditing} />
      ))}
      <div className="sl-post-delete-buttons-container">
        {!editing ? (
          <PostCard list={list} setEditing={setEditing} />
        ) : (
          <>
            <PostCard list={list} setEditing={setEditing} />{" "}
            <DeleteList list={list} setEditing={setEditing} />
          </>
        )}
      </div>
    </div>
  );
};

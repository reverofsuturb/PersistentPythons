import EditList from "./EditList";
import DeleteList from "./DeleteList";
import PostCard from "../Cards/AllCards/PostCard";
import { CardSticker } from "../Cards/AllCards/CardSticker";
import OpenModalButton from "../OpenModalButton";
import { FaTrash } from "react-icons/fa";
import "./SingleList.css";

export const SingleList = ({ list, setEditing }) => {
  return (
    <div className="sb-list-container">
      <EditList list={list} setEditing={setEditing} />
      {list.cards.map((card) => (
        <CardSticker
          key={card.id}
          card={card}
          list={list}
          setEditing={setEditing}
        />
      ))}
      <div className="sl-post-delete-buttons-container">
        <PostCard list={list} setEditing={setEditing} />{" "}
        <OpenModalButton
          buttonText={
            <FaTrash
              id="delete-list-button"
              style={{ fontSize: "12px", color: "white" }}
            />
          }
          id={"delete-list-button-container"}
          css={" "}
          modalComponent={<DeleteList list={list} setEditing={setEditing} />}
        />
      </div>
    </div>
  );
};

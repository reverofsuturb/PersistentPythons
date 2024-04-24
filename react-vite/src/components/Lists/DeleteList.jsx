import { useDispatch } from "react-redux";
import { thunkDeleteList } from "../../store/lists";
import { FaTrash } from "react-icons/fa";

import "./DeleteList.css";

export default function DeleteList({ list, setEditing }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    const res = await dispatch(thunkDeleteList(list.id));
    if (res && res.errors) {
      return res.errors;
    }
    setEditing(false);
  };

  return (
    <>
      <form id="delete-list-button-container" onSubmit={handleSubmit}>
        <button
          id="delete-list-button"
          style={{ fontSize: "12px", color: "white" }}
          type="submit"
        >
          <FaTrash />
        </button>
      </form>
    </>
  );
}

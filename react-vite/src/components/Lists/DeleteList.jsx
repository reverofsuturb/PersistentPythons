import { useDispatch } from "react-redux";
import { thunkDeleteList } from "../../store/lists";
import { FaTrash } from "react-icons/fa";

import "./DeleteList.css";

export default function DeleteList({ list }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = dispatch(thunkDeleteList(list.id));
    if (res && res.errors) {
      return res.errors;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <FaTrash />
        </button>
      </form>
    </>
  );
}

import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkEditList, thunkGetAllLists } from "../../store/lists";
import "./EditList.css";

export default function EditList({ list }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(list.title);
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEdits = {
      title: title,
    };

    const res = await dispatch(thunkEditList(list.id, newEdits));

    if (res && res.errors) {
      return setErrors(res.errors);
    }
    setEditing(false);
    dispatch(thunkGetAllLists());
  };

  return (
    <>
      {editing === false ? (
        <h2 onDoubleClick={() => setEditing(true)} className="eb-lists-title">
          {list.title}
        </h2>
      ) : (
        <form className="eb-lists-form" onSubmit={handleSubmit}>
          <label htmlFor="title">
            <input
              className="eb-lists-input"
              type="text"
              value={title}
              onBlur={handleSubmit}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors?.title && <p className="p-error">{errors.title}</p>}
          </label>
        </form>
      )}
    </>
  );
}

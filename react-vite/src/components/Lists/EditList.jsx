import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkEditList, thunkGetAllLists } from "../../store/lists";
import "./EditList.css";

export default function EditList({ list, setEditing }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(list.title);
  const [errors, setErrors] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [hoverCaption, setHoverCaption] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    const newEdits = {
      title,
    };

    const res = await dispatch(thunkEditList(list.id, newEdits));

    if (res && res.errors) {
      return setErrors(res.errors);
    }
    setShowEdit(false);
    setEditing(false);
    dispatch(thunkGetAllLists());
  };

  const hoverClassName = "hover" + (hoverCaption !== null ? "" : "hidden");

  return (
    <>
      <div className="eb-title_outer_container">
        {showEdit === false ? (
          <div className="eb-title">
            <div className="eb-title_inner_container">
              <h2
                onDoubleClick={() => setShowEdit(true)}
                className="eb-lists-title"
                onMouseEnter={() => setHoverCaption(-1)}
                onMouseLeave={() => setHoverCaption(null)}
              >
                <div className="list-title">{list.title}</div>
              </h2>
            </div>
            <div className="caption_container">
              {hoverCaption === -1 && (
                <p className={hoverClassName}>Double click to edit title</p>
              )}
            </div>
          </div>
        ) : (
          <form className="eb-lists-form" onSubmit={handleSubmit}>
            <label htmlFor="title" role="link">
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
      </div>
    </>
  );
}

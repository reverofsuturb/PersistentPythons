import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkEditList, thunkGetAllLists } from "../../store/lists";
import "./EditList.css";

export default function EditList({ list, setEditing }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(list.title);
  const [errors, setErrors] = useState({});
  const [hoverCaption, setHoverCaption] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    setErrors({});
    const newEdits = {
      title,
    };

    const res = await dispatch(thunkEditList(list.id, newEdits));

    if (res && res.errors) {
      console.log(res);
      return setErrors(res.errors);
    }
    setEditing(false);
    dispatch(thunkGetAllLists());
  };

  const hoverClassName = "hover" + (hoverCaption !== null ? "" : "hidden");

  return (
    <>
      <div className="eb-title_outer_container">
        <div className="eb-title">
          <div className="eb-title_inner_container">
            <h2
              className="eb-lists-title"
              onMouseEnter={() => setHoverCaption(-1)}
              onMouseLeave={() => setHoverCaption(null)}
            >
              <div
                className="list-title"
                contentEditable={true}
                suppressContentEditableWarning={true}
                value={title}
                onInput={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setTitle(e.currentTarget.innerText);
                }}
                onBlur={handleSubmit}
              >
                {list.title}
              </div>
            </h2>
            {errors && (
              <p className="p-error" style={{ margin: "0" }}>
                {errors.title}
              </p>
            )}
          </div>
          <div className="caption_container">
            {hoverCaption === -1 && (
              <p className={hoverClassName}>Click to edit title</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkEditList, thunkGetAllLists } from "../../store/lists";
import "./EditList.css";


export default function EditList({ list }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(list.title);
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [hoverCaption, setHoverCaption] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEdits = {
      title
    };

    const res = await dispatch(thunkEditList(list.id, newEdits));

    if (res && res.errors) {
      return setErrors(res.errors);
    }
    setEditing(false);
    dispatch(thunkGetAllLists());
  };

  const hoverClassName = "hover" + (hoverCaption !== null ? "" : "hidden");

  return (
    <>
      <div className="eb-title_outer-container">

        {editing === false ? (
          <div className="eb-title">

            <div className="eb-title_inner_container">
              <h2 onDoubleClick={() => setEditing(true)} className="eb-lists-title"
                onMouseEnter={() => setHoverCaption(-1)}
                onMouseLeave={() => setHoverCaption(null)}
              >
                <div className="list-title">
                  {list.title}
                </div>
                <div className="list-title-menu">
                  <i className="fa-solid fa-ellipsis" />
                </div>
              </h2>
              <div className="caption_container">
                {hoverCaption === -1 && (
                  <p className={hoverClassName}>
                    Double click here to edit board name
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form className="eb-lists-form" onSubmit={handleSubmit}

          >

            <label htmlFor="title"
              role="link"
            >
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

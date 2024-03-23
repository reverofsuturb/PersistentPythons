import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkPostList } from "../../store/lists";
import { thunkGetAllLists } from "../../store/lists";
import { useNavigate, useParams } from "react-router-dom";
import "./PostLists.css";

export default function PostList() {
  const { board_id } = useParams();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length == 0 ) {
      setErrors({ title: "List title is required" });
      return;
    } else if (title.length > 100) {
      setErrors({ title: "List's title must be shorter than 100 characters long." });
      return;
    }

    let postList = {
      title: title,
    };

    const res = await dispatch(thunkPostList(board_id, postList));

    if (res && res.errors) {
      return setErrors(res.errors);
    }
    dispatch(thunkGetAllLists());
    setTitle("");
    setShowSubmit(false);
  };

  return (
    <>
      {showSubmit === false ? (
        <button
          type=""
          className="pl-lists-button"
          onClick={() => setShowSubmit(!showSubmit)}
        >
          Add a list
        </button>
      ) : (
        <div
          className="pl-lists-container"
          onMouseLeave={() => setTimeout(() => setShowSubmit(false), 1000)}
        >
          <form className="pl-lists-form" onSubmit={handleSubmit}>
            <label className="pl-lists-label" htmlFor="title">
              <input
                className="pl-lists-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a list title"
              />
            </label>
            <div className="pl-lists-button-container">
              <p className="p-error">{errors?.title}</p>{" "}
              <button type="submit" className="pl-lists-submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

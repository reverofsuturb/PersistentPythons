import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkPostList } from "../../../store/lists";
import { useNavigate, useParams } from "react-router-dom";

export default function PostList() {
  const { board_id } = useParams();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postList = {
      title: title,
    };

    const res = await dispatch(thunkPostList(board_id, postList));

    if (res && res.errors) {
      return setErrors(res.errors);
    }

    // const newList = Object.values(res);

    navigate(`/boards/${board_id}`);
  };

  return (
    <>
      <h2>New List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="p-error">{errors?.title}</p>
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkPostCard } from "../../../store/cards";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

export default function PostCard({ list }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState("");
  const [notification, setNotification] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checklist, setChecklist] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postCard = {
      title: title,
      labels: labels,
      notification: notification,
      description: description,
      start_date: startDate,
      end_date: endDate,
      checklist: checklist,
    };

    const res = await dispatch(thunkPostCard(list.id, postCard));

    if (res && res.errors) {
      return setErrors(res.errors);
    }

    // const newCard = Object.values(res);

    navigate(`/boards/${list.board_id}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          {errors?.title && <p className="p-error">{errors.title} </p>}
        </label>
        <label htmlFor="labels">
          Labels
          <input
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
          ></input>
        </label>
        <label htmlFor="notification">
          Notification
          <select
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            id="notification-select"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <label htmlFor="description">
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </label>
        <label htmlFor="startDate">
          Start Date
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          {errors?.start_date && <p className="p-error">{errors.start_date} </p>}
        </label>
        <label htmlFor="endDate">
          End Date
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
          {errors?.end_date && <p className="p-error">{errors.end_date} </p>}
        </label>
        <label htmlFor="checklist">
          Check List
          <input
            value={checklist}
            onChange={(e) => setChecklist(e.target.value)}
          ></input>

        </label>
        <button>Submit</button>
      </form>{" "}
    </>
  );
}

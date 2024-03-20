import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkPostBoard } from "../../../store/boards";

import "./PostCard.css"




export default function PostCard() {
	const dispatch = useDispatch();
  const [title, setTitle] = useState("")
  const [labels, setLabels] = useState("")
  const [notification, setNotificiation] = useState("")

	return (
		<>
			<form onSubmit={handleSubmit}>
        <label htmlFor="">
          <input></input>
        </label>
        <label htmlFor="">
          <input></input>
        </label>
        <label htmlFor="">
          <input></input>
        </label>
        <label htmlFor="">
          <input></input>
        </label>
        <label htmlFor="">
          <input></input>
        </label>
        <label htmlFor="">
          <input></input>
        </label>
        </form>		</>
	);
}

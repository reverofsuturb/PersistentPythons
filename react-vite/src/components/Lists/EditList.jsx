import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { thunkEditList, thunkGetAllLists } from "../../store/lists";







export default function EditList({list}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const list = useSelector((state) => state.lists[list.id])
	// console.log("🚀 ~ EditList ~ list:", list.title)

	const [title, setTitle] = useState(list.title)
	const [errors, setErrors] = useState({})


	const submitEditList = async (e) => {
		e.preventDefault();

		const newEdits = {
			title:title
		}
		console.log("🚀 ~ submitEditList ~ newEdits:", newEdits)

		const res = await dispatch(thunkEditList(list.id, newEdits))
		console.log("🚀 ~ submitEditList ~ res:", res)

		if (res && res.errors) {
			return setErrors(res.errors);
		}

		navigate(`/boards/${list.board_id}`)

	}

	useEffect(() => {
		dispatch(thunkGetAllLists())


	}, [dispatch])


	return (
		<>
		<form onSubmit={submitEditList}>
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
	)
}

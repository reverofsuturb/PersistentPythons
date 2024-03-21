import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllComments } from "../../../store/comments";


import "./AllComments.css"




export default function AllComments(card) {
	console.log("🚀 ~ AllComments ~ card:", card)
	const card_id = card.card.id
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments)
	console.log("🚀 ~ AllComments ~ comments:", comments)

	useEffect(() => {
		dispatch(thunkGetAllComments(card_id))
	}, [dispatch])

	return (
		<>
			<h1>Testing All Comments</h1>
		</>
	);
}

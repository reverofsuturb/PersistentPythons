import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllComments } from "../../../store/comments";


import "./AllComments.css"




export default function AllComments(card) {
	const card_id = card.card.id
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments)
	const commentObj = Object.values(comments)
	console.log("🚀 ~ AllComments ~ commentObj:", commentObj)
	console.log("🚀 ~ AllComments ~ comments:", comments)

	useEffect(() => {
		dispatch(thunkGetAllComments(card_id))
	}, [dispatch])

	return (
		<>
			<h3>Comment:</h3>
		  {commentObj.map((comment, index) => (
			<div key={index}>{comment?.body}</div>
		  ))}
		</>
	  );

}

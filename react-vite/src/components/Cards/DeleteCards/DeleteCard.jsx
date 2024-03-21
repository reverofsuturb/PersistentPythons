import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkEditCard } from "../../../store/cards";
import { useModal } from "../../../context/Modal";
import { thunkDeleteCard } from "../../../store/cards";
import "./DeleteCard.css"




export default function DeleteCard(card) {
	const card_id = card.card.id
	// const getCard = useSelector(state => state.boards)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { closeModal } = useModal();
	const [showMenu, setShowMenu] = useState(false);



	const toggleMenu = (e) => {
		e.stopPropagation();

		// setShowMenu(!showMenu);
	}

	const handleDelete = async () => {
		try {
			await dispatch(thunkDeleteCard(card_id))
			// navigate(`/boards/${board_id}`)
		} catch (error) {
			console.log('Why are you like this', error)
		}
	}


	const noDeletion = (e) => {
		e.preventDefault();

		closeModal();
	}

	// useEffect(() => {

	// 	dispatch(thunkGetBoard(list.board_id))

	// }, [dispatch, list.board_id])



	return (
		<>
			<div className="outer-delete_container">
				<div className="inner-delete_container">
					<h1>Confirm Delete</h1>
					<form action="" onClick={toggleMenu}>
						<div
							className="delete-board-modal-pop">
							<button
								className="delete-board-button"
								board_id="delete-board-yes"
								onClick={() => {
									handleDelete()
								}}>

								Yes (Delete Board)
							</button>
							<button
								className="delete-board-button"
								board_id="delete-board-no"
								onClick={() => noDeletion()}
							> No (Go Back)</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
// import { thunkDeleteBoard, thunkGetBoard } from "../../../../store/boards";
import { thunkDeleteBoard, thunkGetBoard } from "../../../store/boards";
import { useModal } from "../../../context/Modal";


import "./DeleteBoard.css";

//! WARNING: Unable to delete, getting rejection of "destroy " from unknown origin
export default function DeleteBoard({ board_id, board }) {

	const boards = useSelector(state => state.boards)
	const dispatch = useDispatch()
	const { closeModal } = useModal();
	const [showMenu, setShowMenu] = useState(false);
	const thisRef = useRef();
	const [currState, setCurrState] = useState([boards])

	console.log("%c 🚀 ~ file: DeleteBoard.jsx:15 ~ DeleteBoard ~ boards: ", "color: red; font-size: 25px", boards)

	console.log("BOARD", board)
	const toggleMenu = (e) => {
		e.stopPropagation();

		setShowMenu(!showMenu);
	}

	const handleDelete = (board_id) => {

		dispatch(thunkDeleteBoard(board_id))
		const remainingBoards = boards.filter(currBoard => currBoard.id != board_id)

		setCurrState(remainingBoards)

		closeModal()
	}

	const noDeletion = async (e) => {
		e.preventDefault();

		await dispatch(thunkGetBoard(board_id))

		closeModal()
	}

	useEffect(() => {

		dispatch(thunkGetBoard(board_id))

	}, [dispatch, board_id, currState])


	return (
		<>
			<div className="outer-delete_container">
				<div className="inner-delete_container">
					<h1>Confirm Delete</h1>
					<form action="" onClick={toggleMenu}>
						<div
							ref={thisRef}
							className="delete-board-modal-pop">
							<button
								className="delete-board-button" id="delete-board-yes"
								onClick={handleDelete}>
								Yes (Delete Board)
							</button>
							<button
								className="delete-board-button" id="delete-board-no"
								onClick={noDeletion}
							> No (Go Back)</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

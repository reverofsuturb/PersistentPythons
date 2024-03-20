import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { thunkDeleteBoard, thunkGetBoard } from "../../../../store/boards";
import { thunkDeleteBoard, thunkGetBoard } from "../../../store/boards";
import { useModal } from "../../../context/Modal";


import "./DeleteBoard.css";

export default function DeleteBoard({ board_id, board }) {

console.log("%c 🚀 ~ file: DeleteBoard.jsx:13 ~ DeleteBoard ~ board_id: ", "color: white; font-size: 25px", board_id)


	const boards = useSelector(state => state.boards)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { closeModal } = useModal();
	const [showMenu, setShowMenu] = useState(false);
	const thisRef = useRef();
	const [currState, setCurrState] = useState([boards]);

	console.log("%c 🚀 ~ file: DeleteBoard.jsx:15 ~ DeleteBoard ~ boards: ", "color: red; font-size: 25px", boards)

	console.log("BOARD", board)
	const toggleMenu = (e) => {
		e.stopPropagation();

		setShowMenu(!showMenu);
	}

	const handleDelete = async (board_id) => {

		await dispatch(thunkDeleteBoard(board_id))
		// const remainingBoards = boards.filter(currBoard => currBoard.id != board_id)

		// setCurrState(remainingBoards)

		closeModal()

		navigate('/boards')
	}

	const noDeletion = (e) => {
		e.preventDefault();

		closeModal();
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
								className="delete-board-button"
								// board_id="delete-board-yes"
								onClick={handleDelete}>
								Yes (Delete Board)
							</button>
							<button
								className="delete-board-button"
								// board_id="delete-board-no"
								onClick={noDeletion}
							> No (Go Back)</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

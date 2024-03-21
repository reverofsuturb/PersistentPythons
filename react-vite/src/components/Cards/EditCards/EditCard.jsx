import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkEditCard } from "../../../store/cards";
import { useModal } from "../../../context/Modal";
import "./EditCard.css"




export default function EditCard({ card, list }) {


	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState(card.title);
	const [labels, setLabels] = useState(card.labels);
	const [notification, setNotification] = useState(card.notification);
	const [description, setDescription] = useState(card.description);
	const [startDate, setStartDate] = useState(card.start_date);
	const [endDate, setEndDate] = useState(card.end_date);
	const [checklist, setChecklist] = useState(card.checklist);
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [showMenu, setShowMenu] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();

		const editCard = {
			title,
			labels,
			notification,
			description,
			start_date: startDate,
			end_date: endDate,
			checklist
		};

		const res = await dispatch(thunkEditCard(card.id, editCard));

		closeModal()
		if (res && res.errors) {
			return setErrors(res.errors);
		}
	};
	const toggleMenu = (e) => {
		e.stopPropagation();

		setShowMenu(!showMenu)
	}

	return (
		<>
			<form onSubmit={handleSubmit}
				onClick={toggleMenu}
				className="edit-card-modal"
			>
				<label htmlFor="title">
					Title
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter a title"
					/>
				</label>
				<label htmlFor="labels">
					Labels
					<input
						value={labels}
						onChange={(e) => setLabels(e.target.value)}
						placeholder="Enter a label"
					/>
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
						placeholder="Enter a description"
					/>
				</label>
				<label htmlFor="startDate">
					Start Date
					<input
						value={startDate}
						type="date"
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</label>
				<label htmlFor="endDate">
					End Date
					<input
						value={endDate}
						type="date"
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</label>
				<label htmlFor="checklist">
					Check List
					<input
						value={checklist}
						onChange={(e) => setChecklist(e.target.value)}
					/>
					<p className="p-error">{errors?.title} </p>
				</label>
				<button>Submit</button>
			</form>{" "}
		</>
	);
}

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetBoard } from "../../../store/boards";
import { useParams } from "react-router-dom";
import "./SingleBoard.css";




export default function SingleBoard(){
    const dispatch = useDispatch()
    const { board_id } = useParams()

    const board = useSelector((state) => state.boards[board_id]);
    console.log("🚀 ~ SingleBoard ~ board:", board);

    // const boardObject = Object.values(board)

    useEffect(() => {
        dispatch(thunkGetBoard(board_id))

    }, [dispatch, board_id]);

    return (
        <>
            <div>
                <h1>Hello</h1>
                {board?.board_name}
            </div>

        </>
    )
}

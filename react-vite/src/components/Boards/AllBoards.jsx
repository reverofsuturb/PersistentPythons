import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllBoards } from "../../store/boards";

export default function AllBoards() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  //   console.log("BOARDS", boards);

  const allBoards = Object.values(boards);

  useEffect(() => {
    dispatch(thunkGetAllBoards());
  }, [dispatch]);

  return (
    <>
      <h1>Hello</h1>
      <ul>
        {allBoards.length &&
          allBoards?.map((board) => (
            <div key={board.id}>{board.board_name}</div>
          ))}
      </ul>
    </>
  );
}

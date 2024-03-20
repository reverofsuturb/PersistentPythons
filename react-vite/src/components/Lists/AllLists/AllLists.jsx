import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllLists } from "../../../store/lists";
import "./AllLists.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AllLists() {
  const { board_id } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  const allLists = Object.values(lists).filter(
    (list) => list.board_id == board_id
  );

  console.log("LISTS", allLists);

  useEffect(() => {
    dispatch(thunkGetAllLists());
  }, [dispatch]);

  return (
    <>
      <ul>
        {allLists.length &&
          allLists?.map((list) => <li key={list.id}>{list.title}</li>)}
      </ul>
    </>
  );
}

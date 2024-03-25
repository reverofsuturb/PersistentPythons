import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { thunkDeleteList } from "../../store/lists";
import { FaTrash } from "react-icons/fa";

import "./DeleteList.css";

export default function DeleteList({ list }) {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const res = dispatch(thunkDeleteList(list.id));
    if (res && res.errors) {
      return res.errors;
    }
    return res;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <FaTrash />
        </button>
      </form>
    </>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { thunkDeleteList } from "../../store/lists";

import "./DeleteList.css";

export default function DeleteList({ list }) {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log("res")
    const res = dispatch(thunkDeleteList(list.id));
    if (res && res.errors) {
      return res.errors;
    }
    console.log(res);
    return res;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button>Delete List</button>
      </form>
    </>
  );
}

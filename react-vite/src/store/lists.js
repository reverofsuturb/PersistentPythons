const GET_ALL_LISTS = "lists/getAllLists";
const POST_LIST = "lists/postList";
const EDIT_LIST = "lists/editList";
const DELETE_LIST = "lists/deleteList";

const getAllLists = (lists) => ({
  type: GET_ALL_LISTS,
  lists,
});

const postList = (list) => ({
  type: POST_LIST,
  list,
});
const editList = (list) => ({
  type: EDIT_LIST,
  list,
});
const deleteList = (list_id) => ({
  type: DELETE_LIST,
  list_id,
});

export const thunkGetAllLists = () => async (dispatch) => {
  const res = await fetch("/api/lists");
  //   console.log("RES", res);
  if (res.ok) {
    const data = await res.json();
    // console.log("DATA", data);

    if (data.errors) {
      return data.errors;
    }

    dispatch(getAllLists(data));
  }
};

export const thunkPostList = (board_id, list) => async (dispatch) => {
  const res = await fetch(`/api/boards/${board_id}/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  console.log("RES", res);
  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return data.errors;
    }
    const list = await dispatch(postList(data));
    console.log("LIST", list);
    return list;
  }
};

export const thunkEditList = (list_id, list) => async (dispatch) => {
  console.log("ARE WE HERE");
  const res = await fetch(`/api/lists/${list_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ thunkPostList ~ data:", data);

    if (data.errors) {
      console.log("🚀 ~ thunkEditList ~ data.errors:", data.errors);
      return data.errors;
    }

    await dispatch(editList(data));
    return data;
  }
};

export const thunkDeleteList = (list_id) => async (dispatch) => {
  const res = await fetch(`/api/lists/${list_id}`, {
    method: "DELETE",
  });
  console.log(res)
  if (res.ok) {
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
  }
  await dispatch(deleteList(list_id));
};

const initialState = {};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LISTS: {
      let listState = {};
      action.lists.Lists.forEach((list) => {
        listState[list.id] = list;
      });
      //   console.log("LISTS-STATE", listState);
      return listState;
    }
    case POST_LIST: {
      return { ...state, [action.list.id]: action.list };
    }
    case EDIT_LIST: {
      return { ...state, [action.list.id]: action.list };
    }
    case DELETE_LIST: {
      listState = { ...state };
      delete listState[action.list_id];
      return listState;
    }
    default:
      return state;
  }
}

export default listReducer;

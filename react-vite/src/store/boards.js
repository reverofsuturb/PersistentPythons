const GET_ALL_BOARDS = "boards/getAllBoards";
const GET_BOARD = "boards/getBoard";
const POST_BOARD = "boards/postBoard";
const PUT_BOARD = "boards/putBoard";
const DELETE_BOARD = "boards/deleteBoard";

const getAllBoards = (boards) => ({
  type: GET_ALL_BOARDS,
  boards,
});

const getBoard = (board) => ({
  type: GET_BOARD,
  board,
});

const postBoard = (board) => ({
  type: POST_BOARD,
  board,
});

const putBoard = (board) => ({
  type: PUT_BOARD,
  board,
});

const deleteBoard = (board_id) => ({
  type: DELETE_BOARD,
  board_id,
});

export const thunkGetAllBoards = () => async (dispatch) => {
  const response = await fetch("/api/boards");

  if (response.ok) {
    const data = await response.json();


    if (data.errors) {
      return data;
    }
    dispatch(getAllBoards(data));
  }
};

export const thunkGetBoard = (board_id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${board_id}`);
  const data = await response.json();

  if (data.errors) {
    return data;
  }

  dispatch(getBoard(data));
};

export const thunkPostBoard = (board) => async (dispatch) => {
  const response = await fetch("/api/boards/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    const board = await dispatch(postBoard(data));
    return board;
  }
};

export const thunkPutBoard = (board, board_id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${board_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    dispatch(putBoard(data));
  }
};

export const thunkDeleteBoard = (board_id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${board_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(deleteBoard(data));
};

const initialState = {};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOARDS: {
      let boardState = {};
      action.boards.Boards.forEach((board) => {
        boardState[board.id] = board;
      });
      return boardState;
    }
    case GET_BOARD: {
      return { ...state, [action.board.id]: action.board };
    }
    case POST_BOARD: {
      return { ...state, [action.board.id]: action.board };
    }
    case PUT_BOARD: {
      return { ...state, [action.board.id]: action.board };
    }
    case DELETE_BOARD: {
      const boardState = { ...state };
      delete boardState[action.board_id];
      return boardState;
    }
    default:
      return state;
  }
};

export default boardsReducer;

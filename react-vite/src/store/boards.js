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

const deleteBoard = () => ({
  type: DELETE_BOARD,
});

export const thunkGetAllBoards = () => async (dispatch) => {
  const response = await fetch("/api/boards");
  console.log("RESPONSE", response);
  if (response.ok) {
    const data = await response.json();
    console.log(
      "🚀 %c ~ file: boards.js:178 ~ thunkAllBoards ~ data:",
      "color: magenta; font-size: 32px",
      data
    );

    if (data.errors) {
      return data.errors;
    }
    dispatch(getAllBoards(data));
  }
};

export const thunkGetBoard = (board_id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${board_id}`);
  console.log("🚀 ~ thunkGetBoard ~ response:", response)
  if (response.ok) {
    const data = await response.json();
    console.log("🚀 ~ thunkGetBoard ~ data:", data)
    if (data.errors) {
      return data.errors;
    }
    dispatch(getBoard(data));
  }
};

export const thunkPostBoard = (board) => async (dispatch) => {
  const response = await fetch("/api/boards/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(board),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    const board = await dispatch(postBoard(data));
    return board
  }
};

export const thunkPutBoard = (board, board_id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${board_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(board),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(putBoard(data));
  }
};

export const thunkDeleteBoard = (board_id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${board_id}`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(deleteBoard(data));
  }
};







const initialState = {};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {



    case GET_ALL_BOARDS: {
      let boardState = {};
      console.log("%c 🚀 ~ file: boards.js:108 ~ boardsReducer ~ action GET ALL BOARDS: ", "color: magenta; font-size: 25px", action)
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

      const newEditState = { ...state }
      const newEditBoard = { ...action.board }

      newEditState[action.board.id] = {
        ...newEditBoard
      }
      return newEditState
    }
    case DELETE_BOARD: {
      // return { ...state, [action.board.id]: action.board };

      const oldState = { ...state };

      delete oldState[action.id]
      return oldState;
    }
    default:
      return state;
  }
};




export default boardsReducer;

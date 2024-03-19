const GET_ALL_BOARDS ="boards/getAllBoards"
const GET_BOARD = "boards/getBoard";
const POST_BOARD = "boards/postBoard";
const PUT_BOARD = "boards/putBoard";
const DELETE_BOARD = "boards/deleteBoard";

const getAllBoards = () => ({
  type: GET_ALL_BOARDS,
  boards
})

const getBoard = () => ({
  type: GET_BOARD,
  board,
});

const postBoard = () => ({
  type: POST_BOARD,
  board,
});

const putBoard = () => ({
  type: PUT_BOARD,
  board,
});

const deleteBoard = () => ({
  type: DELETE_BOARD,
});

export const thunkGetAllBoards = () => async (dispatch) => {
  const response = await fetch("/api/boards");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(getAllBoards(data));
  }
};


export const thunkGetBoard = (board_id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${board_id}`);
  if (response.ok) {
    const data = await response.json();
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
    dispatch(postBoard(data));
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
const initialState = {}

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOARDS:{
      boardState = {}
      action.boards.forEach((board) => {
      boardState[board.id] = board
      })
      return boardState
    }
    case GET_BOARD:
      return { ...state, [action.board.id]: board };
    case POST_BOARD:
      return { ...state, [action.board.id]: board };
    case PUT_BOARD:
      return { ...state, [action.board.id]: board };
    case DELETE_BOARD:
      return { ...state, [action.board.id]: board };
    default:
      return state;
  }
};

export default boardsReducer;

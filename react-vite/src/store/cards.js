const GET_CARD = "cards/getCard";
const POST_CARD = "cards/postCard";
const EDIT_CARD = "cards/editCard";
const DELETE_CARD = "cards/deleteCard";

const getCard = (card) => ({
  type: GET_CARD,
  card,
});

const postCard = (card) => ({
  type: POST_CARD,
  card,
});

const editCard = (card) => ({
  type: EDIT_CARD,
  card,
});

const deleteCard = (card_id) => ({
  type: DELETE_CARD,
  card,
});

export const thunkGetCard = (card_id) => async (dispatch) => {
  const res = await fetch(`/api/cards/${card_id}`);

  if (res.ok) {
    const data = await res.json();
    console.log("DATA", data);
  }

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data.errors;
  }
  dispatch(getCard(data));
};

export const thunkPostCard = (list_id, card) => async (dispatch) => {
  const res = await fetch(`/api/lists/${list_id}/card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  if (res.ok) {
    const data = await res.json();
    console.log("DATA", data);
  }

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data.errors;
  }
  const card = await dispatch(postCard(data));
  return card;
};

const thunkEditCard = (card_id, card) => async (dispatch) => {
  const res = await fetch(`api/cards/${card_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  if (res.ok) {
    const data = await res.json();
    console.log("DATA", data);
  }

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data.errors;
  }
  const card = await dispatch(editCard(data));
  return card;
};

const thunkDeleteCard = (card_id) => async (dispatch) => {
  const res = await fetch(`/api/cards/${card_id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    console.log("DATA", data);
  }

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data.errors;
  }
  await dispatch(deleteCard(data));
};

const initialState = {};

export default function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARD: {
      return { ...state, [action.card.id]: action.card };
    }
    case POST_CARD: {
      return { ...state, [action.card.id]: action.card };
    }
    case EDIT_CARD: {
      return { ...state, [action.card.id]: action.card };
    }
    case DELETE_CARD: {
      const cardState = { ...state };
      delete cardState[action.card_id];
      return cardState;
    }
    default:
      return state;
  }
}

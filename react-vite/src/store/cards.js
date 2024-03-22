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
  card_id,
});

export const thunkGetCard = (card_id) => async (dispatch) => {
  const res = await fetch(`/api/cards/${card_id}`);

  const data = await res.json();
  if (data.errors) {
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
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  } else {
    const newCard = await dispatch(postCard(data));
    return newCard;
  }
};

export const thunkEditCard = (card_id, card) => async (dispatch) => {
  const res = await fetch(`/api/cards/${card_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  const data = await res.json();

  if (data.errors) {
    return data;
  } else {
    const card = await dispatch(editCard(data));
    return card;
  }
};

export const thunkDeleteCard = (card_id) => async (dispatch) => {
  console.log("🚀 ~ thunkDeleteCard ~ card_id:", card_id)
  console.log('Heree!!')
  const res = await fetch(`/api/cards/${card_id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.errors) {
    return data;
  }
  await dispatch(deleteCard(card_id));
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

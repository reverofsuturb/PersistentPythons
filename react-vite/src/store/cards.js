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
  console.log("DATA", data);

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data;
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
  console.log("DATA", data);

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data;
  } else {
    const card = await dispatch(postCard(data));
    return card;
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

<<<<<<< HEAD
  console.log(
    "%c 🚀 ~ file: cards.js:74 ~ thunkEditCard ~ data: ",
    "color: gold; font-size: 25px",
    data
  );
=======

>>>>>>> 2814d0600ce4fa965e6adce5a593f5922fc5bca6

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data;
  } else {
    const card = await dispatch(editCard(data));
    return card;
  }
};

export const thunkDeleteCard = (card_id) => async (dispatch) => {
<<<<<<< HEAD
  const res = await fetch(`/api/cards/${card_id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log("DATA", data);
=======
  console.log("🚀 ~ thunkDeleteCard ~ card_id:", card_id)
  const res = await fetch(`/api/cards/${card_id}`, {
    method: "DELETE",
  });
  console.log("🚀 ~ thunkDeleteCard ~ res:", res)
  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ thunkDeleteCard ~ data:", data)
    console.log("DATA", data);
  }
>>>>>>> 2814d0600ce4fa965e6adce5a593f5922fc5bca6

  if (data.errors) {
    console.log("ERRORS", data.errors);
    return data;
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

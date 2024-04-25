const GET_ALL_CARDS = "cards/getAllCards";
const GET_CARD = "cards/getCard";
const POST_CARD = "cards/postCard";
const EDIT_CARD = "cards/editCard";
const DELETE_CARD = "cards/deleteCard";
const ADD_CARD_IMAGE = "cards/newImage";

const getAllCards = (cards) => ({
  type: GET_ALL_CARDS,
  cards,
});

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

const addCardImage = (card_id, image) => ({
  type: ADD_CARD_IMAGE,
  card_id,
  image,
});

export const thunkPostCardImage = (card_id, image) => async (dispatch) => {
  const res = await fetch(`/api/cards/${card_id}/card_image`, {
    method: "POST",
    body: image,
  });

  const data = await res.json();

  if (data.errors) {
    return data;
  }

  const responseImage = await dispatch(addCardImage(data));

  return responseImage;
};

export const thunkGetAllCards = () => async (dispatch) => {
  const res = await fetch(`/api/cards`);
  const data = await res.json();

  if (data && data.errors) {
    return data;
  }
  dispatch(getAllCards(data));
};

export const thunkGetCard = (card_id) => async (dispatch) => {
  const res = await fetch(`/api/cards/${card_id}`);

  const data = await res.json();

  if (data.errors) {
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
  if (data.errors) {
    return data;
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

export const thunkPatchCard = (cardId, coverPhoto) => async (dispatch) => {
  const res = await fetch(`/api/cards/${cardId}/cover`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coverPhoto),
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
    case GET_ALL_CARDS: {
      const cardState = {};
      action.cards.Cards.forEach((card) => {
        cardState[card.id] = card;
      });
      return cardState;
    }
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
    case ADD_CARD_IMAGE: {
      return {
        ...state,
        [action.card_id]: { ...state[action.card_id], image: action.image },
      };
    }
    default:
      return state;
  }
}

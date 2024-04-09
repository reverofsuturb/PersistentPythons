const GET_ALL_CARD_IMAGES = "cardImages/getAllCardImages";
const GET_CARD_IMAGE = "cardImages/getCardImage";

const getAllCardImages = (cardImages) => ({
  type: GET_ALL_CARD_IMAGES,
  cardImages,
});

const getCardImage = (card_id, images) => ({
  type: GET_CARD_IMAGE,
  card_id,
  images,
});


export const thunkAllGetCardImages = () => async (dispatch) => {
  const res = await fetch(`/api/card_images`)
  const data = await res.json()
  if (data & data.errors) {
    return data
  }
  dispatch(getAllCardImages(data))
}

export const thunkGetCardImage = (card_id) => async (dispatch) => {
  const res = await fetch(`/api/card_images/${card_id}`, {
    method: "GET",
  });

  const data = await res.json();

  if (data.errors) return data;

  dispatch(getCardImage(card_id, data));
};

const initialState = {};

export default function cardsImagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARD_IMAGES: {
      const cardImageState = {}
      action.cardImages.forEach((image) => {
        cardImageState[image.id] = image
      })
      return cardImageState
    }
    case GET_CARD_IMAGE: {
      return { ...state, [action.card_id]: action.images };
    }
    default:
      return state;
  }
}

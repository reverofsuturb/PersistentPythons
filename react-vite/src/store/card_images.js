const GET_CARD_IMAGE = "cardImages/getCardImage"

const getCardImage = (card_id) => ({
    type: GET_CARD_IMAGE,
    card_id
  });

  export const thunkGetCardImage = (card_id) => async(dispatch) => {
    console.log("🚀 ~ thunkGetCardImage ~ card_id:", card_id)
    const res = await fetch(`/api/card_images/${card_id}`, {
      method: "GET"
    })
    console.log("🚀 ~ thunkGetCardImage ~ res:", res)

    const data = await res.json()
    console.log("🚀 ~ thunkGetCardImage ~ data:", data)

    if(data.errors) return data

    dispatch(getCardImage(card_id))
  }


const initialState = {};

export default function cardsImagesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARD_IMAGE: {
          return { ...state, [action.card_id]: {...state[action.card_id], image: action.image} };
        }
        default:
          return state;
      }
}

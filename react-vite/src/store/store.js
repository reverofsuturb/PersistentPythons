import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import boardsReducer from "./boards";
import listReducer from "./lists";
import cardsReducer from "./cards";
import { commentsReducer } from "./comments";
import cardsImagesReducer from "./card_images";

const rootReducer = combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  lists: listReducer,
  cards: cardsReducer,
  comments: commentsReducer,
  cardImages: cardsImagesReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

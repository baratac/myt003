import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const middleWare = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWare))
  );

  export default store;
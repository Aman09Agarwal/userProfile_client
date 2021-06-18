import { applyMiddleware, createStore } from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import reducers from "./reducers";

const middlewares = applyMiddleware(promise, thunk);

export default createStore(reducers, middlewares);

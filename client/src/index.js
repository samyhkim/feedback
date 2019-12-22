import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// Development only axios helpers
import axios from "axios";
window.axios = axios;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Second argument is most relevant for setting up initial state with SSR
const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(reduxThunk))
);

// 1. Provider is a React component that can read changes from Redux store at any time
// 2. Redux store gets new states
// 3. Provider will inform all of its children components
// AKA. Any component App renders will be provided and updated with new states
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// console.log("Stripe key is", process.env.REACT_APP_STRIPE_KEY);
// console.log("Environemnt is", process.env.NODE_ENV);

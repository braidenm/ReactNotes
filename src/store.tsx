import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
// import { composeWithDevTools } from "redux-devtools-extension";
// import {useSelector} from 'react-redux';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;
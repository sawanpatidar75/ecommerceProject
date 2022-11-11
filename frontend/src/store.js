import {combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import {configureStore} from "@reduxjs/toolkit"

const reducers = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer
    
});

let initialState={};

const middleware = [thunk];

const store = configureStore(
    {reducer:reducers}, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
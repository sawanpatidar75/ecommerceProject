// import { createReducer } from "@reduxjs/toolkit";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";


// const initialState = {};
// export const customeReducer = createReducer(initialState, {
//     ALL_PRODUCT_REQUEST: (state = { products:[] }, action) => {
//         return {
//             loading:true,
//             products:[]
//         }
//     },
//     ALL_PRODUCT_SUCCESS: (state = { products:[] }, action) => {
//         return {
//                 loading:false,
//                 products: action.payload.products,
//                 productsCount: action.payload.productsCount
//             }
//     },
//     ALL_PRODUCT_FAIL: (state = { products:[] }, action) => {
//         return {
//                 loading:false,
//                 error: action.payload
//             }
//     },
//     CLEAR_ERRORS: (state = { products:[] }, action) => {
//         return {
//                 ...state,
//                 error: action.payload
//             }
//     }

// })


export const productReducer = (state = { products:[] }, action) => {

    switch(action.type){
        case ALL_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}
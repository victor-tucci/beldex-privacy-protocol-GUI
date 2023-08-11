import * as actionTypes from "../common/actionTypes";

const initialState = {
      swap: ''
};

export const swapReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SWAPCHANGE:
        return {
            ...state,
            swap: action.payload
        };
        case actionTypes.RESETSWAPCHANGE:
        return {
            ...initialState
        };
        default:
        return state;
    }
}
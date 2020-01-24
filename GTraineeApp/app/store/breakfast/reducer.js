import * as types from './actionTypes'


const initialState = {
    resMsg: {},
};

export default function selectedBreakfast(state = initialState, action = {}) {
    switch (action.type) {
        case types.BREAKFAST_FETCH_REQUEST:
            return {
            ...state,
            loading: true,
            error: ''
        }
        case types.BREAKFAST_FETCH_SUCCESS:
            return {
                ...state,
                resMsg: action.payload,
                loading: false,
                error:''
            }
        case types.BREAKFAST_FETCH_FAIL:
            return {
                ...state,
                resMsg: action.payload,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
}
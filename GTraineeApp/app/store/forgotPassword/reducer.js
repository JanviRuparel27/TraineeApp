import * as types from './actionTypes'


const initialState = {
    data: [],
};

export default function forgotPassword(state = initialState, action = {}) {
    switch (action.type) {
        case types.FORGOT_PASS_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.FORGOT_PASS_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                error:''
            }
        case types.FORGOT_PASS_FETCH_FAIL:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
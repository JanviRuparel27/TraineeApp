import * as types from './actionTypes'


const initialState = {
    data: [],
};

export default function userGeneralFeedback(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_FEEDBACK_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.USER_FEEDBACK_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                error:''
            }
        case types.USER_FEEDBACK_FETCH_FAIL:
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
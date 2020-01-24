import * as types from './actionTypes'


const initialState = {
   feedbackSucceeMsg: {},
};

export default function feddback(state = initialState, action = {}) {
    switch (action.type) {
        case types.FEEDBACK_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.FEEDBACK_FETCH_SUCCESS:
            return {
                ...state,
                feedbackSucceeMsg: action.payload,
                fetching: false,
                error:''
            }
        case types.FEEDBACK_FETCH_FAIL:
            return {
                ...state,
                feedbackSucceeMsg: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
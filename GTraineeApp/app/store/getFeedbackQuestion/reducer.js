import * as types from './actionTypes'


const initialState = {
    data: [],
};

export default function getFeedbackQuestion(state = initialState, action = {}) {
    switch (action.type) {
        case types.FEDDBACK_QUESTION_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.FEDDBACK_QUESTION_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                error:''
            }
        case types.FEDDBACK_QUESTION_FETCH_FAIL:
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
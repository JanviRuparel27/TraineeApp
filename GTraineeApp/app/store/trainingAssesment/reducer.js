import * as types from './actionTypes'


const initialState = {
    tariningAssesmentQuestion: [],
};

export default function getAssesmentQuestion(state = initialState, action = {}) {
    switch (action.type) {
        case types.TRAINING_ASSESMENT_QUESTION_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.TRAINING_ASSESMENT_QUESTION_FETCH_SUCCESS:
            return {
                ...state,
                tariningAssesmentQuestion: action.payload,
                fetching: false,
                error:''
            }
        case types.TRAINING_ASSESMENT_QUESTION_FETCH_FAIL:
            return {
                ...state,
                tariningAssesmentQuestion: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
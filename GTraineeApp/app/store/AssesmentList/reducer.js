import * as types from './actionTypes'


const initialState = {
    tariningAssesment: [],
};

export default function trainingAssesment(state = initialState, action = {}) {
    switch (action.type) {
        case types.TRAINING_ASSESMENT_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.TRAINING_ASSESMENT_FETCH_SUCCESS:
            return {
                ...state,
                tariningAssesment: action.payload,
                fetching: false,
                error:''
            }
        case types.TRAINING_ASSESMENT_FETCH_FAIL:
            return {
                ...state,
                tariningAssesment: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
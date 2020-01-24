import * as types from './actionTypes'


const initialState = {
    myTrainingList: [],
};

export default function myTrainingList(state = initialState, action = {}) {
    switch (action.type) {
        case types.MYTRAINING_LIST_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.MYTRAINING_LIST_FETCH_SUCCESS:
            return {
                ...state,
                myTrainingList: action.payload,
                fetching: false,
                error:''
            }
        case types.MYTRAINING_LIST_FETCH_FAIL:
            return {
                ...state,
                myTrainingList: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
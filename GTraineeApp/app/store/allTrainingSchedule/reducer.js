import * as types from './actionTypes'


const initialState = {
    allTrainingList: [],
};

export default function getAllTrainingSchedule(state = initialState, action = {}) {
    switch (action.type) {
        case types.TRAINING_SCHEDULE_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.TRAINING_SCHEDULE_FETCH_SUCCESS:
            return {
                ...state,
                allTrainingList: action.payload,
                fetching: false,
                error:''
            }
        case types.TRAINING_SCHEDULE_FETCH_FAIL:
            return {
                ...state,
                allTrainingList: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
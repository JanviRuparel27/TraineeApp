import * as types from './actionTypes'


const initialState = {
    mySchedulesList: [],
};

export default function mySchedules(state = initialState, action = {}) {
    switch (action.type) {
        case types.MYSCHEDULES_LIST_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.MYSCHEDULES_LIST_FETCH_SUCCESS:
            return {
                ...state,
                mySchedulesList: action.payload,
                fetching: false,
                error:''
            }
        case types.MYSCHEDULES_LIST_FETCH_FAIL:
            return {
                ...state,
                mySchedulesList: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
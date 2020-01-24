import * as types from './actionTypes'


const initialState = {
    succeeMsg: {},
};

export default function trainingScan(state = initialState, action = {}) {
    switch (action.type) {
        case types.TRAINING_SCAN_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.TRAINING_SCAN_FETCH_SUCCESS:
            return {
                ...state,
                succeeMsg: action.payload,
                fetching: false,
                error:''
            }
        case types.TRAINING_SCAN_FETCH_FAIL:
            return {
                ...state,
                succeeMsg: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
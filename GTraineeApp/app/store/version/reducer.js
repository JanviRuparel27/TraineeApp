import * as types from './actionTypes'


const initialState = {
    data: [],
};

export default function getVersionValue(state = initialState, action = {}) {
    switch (action.type) {
        case types.BUILD_VERSION_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.BUILD_VERSION_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                error:''
            }
        case types.BUILD_VERSION_FETCH_FAIL:
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
import * as types from './actionTypes'


const initialState = {
    succeeMsg: {},
};

export default function registerQuery(state = initialState, action = {}) {
    switch (action.type) {
        case types.REGISTER_QUERY_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.REGISTER_QUERY_FETCH_SUCCESS:
            return {
                ...state,
                succeeMsg: action.payload,
                fetching: false,
                error:''
            }
        case types.REGISTER_QUERY_FETCH_FAIL:
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
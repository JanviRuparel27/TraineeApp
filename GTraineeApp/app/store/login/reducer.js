import * as types from './actionTypes'


const initialState = {
    login: {},
};

export default function login(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGIN_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.LOGIN_FETCH_SUCCESS:
            return {
                ...state,
                login: action.payload,
                fetching: false,
                error:''
            }
        case types.LOGIN_FETCH_FAIL:
            return {
                ...state,
                login: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}

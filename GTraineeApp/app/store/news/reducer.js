import * as types from './actionTypes'


const initialState = {
    newsData: {},
};

export default function gettop5news(state = initialState, action = {}) {
    switch (action.type) {
        case types.NEWS_FETCH_REQUEST:
            return {
            ...state,
            loading: true,
            error: ''
        }
        case types.NEWS_FETCH_SUCCESS:
            return {
                ...state,
                newsData: action.payload,
                loading: false,
                error:''
            }
        case types.NEWS_FETCH_FAIL:
            return {
                ...state,
                newsData: action.payload,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
}
import * as types from './actionTypes'


const initialState = {
    newsListData: {},
};

export default function getAllNewsList(state = initialState, action = {}) {
    switch (action.type) {
        case types.NEWSLIST_FETCH_REQUEST:
            return {
            ...state,
            loading: true,
            error: ''
        }
        case types.NEWSLIST_FETCH_SUCCESS:
            return {
                ...state,
                newsListData: action.payload,
                loading: false,
                error:''
            }
        case types.NEWSLIST_FETCH_FAIL:
            return {
                ...state,
                newsListData: action.payload,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
}
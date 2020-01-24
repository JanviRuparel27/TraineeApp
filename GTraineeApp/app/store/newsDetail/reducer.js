import * as types from './actionTypes'


const initialState = {
    newsDetail: {},
};

export default function data(state = initialState, action = {}) {
    switch (action.type) {
        case types.NEWSDETAIL_FETCH_REQUEST:
            return {
            ...state,
            loading: true,
            error: ''
        }
        case types.NEWSDETAIL_FETCH_SUCCESS:
            return {
                ...state,
                newsDetail: action.payload,
                loading: false,
                error:''
            }
        case types.NEWSDETAIL_FETCH_FAIL:
            return {
                ...state,
                newsDetail: action.payload,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
}
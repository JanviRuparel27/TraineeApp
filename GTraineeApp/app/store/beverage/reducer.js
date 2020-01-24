import * as types from './actionTypes'


const initialState = {
    beverageData: {},
};

export default function selectedBeverage(state = initialState, action = {}) {
    switch (action.type) {
        case types.BEVERAGES_FETCH_REQUEST:
            return {
            ...state,
            loading: true,
            error: ''
        }
        case types.BEVERAGES_FETCH_SUCCESS:
            return {
                ...state,
                beverageData: action.payload,
                loading: false,
                error:''
            }
        case types.BEVERAGES_FETCH_FAIL:
            return {
                ...state,
                beverageData: action.payload,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
}
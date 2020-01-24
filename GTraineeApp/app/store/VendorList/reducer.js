import * as types from './actionTypes'


const initialState = {
    vendorLIst: [],
};

export default function getVendorList(state = initialState, action = {}) {
    switch (action.type) {
        case types.VENDOR_LIST_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.VENDOR_LIST_FETCH_SUCCESS:
            return {
                ...state,
                vendorLIst: action.payload,
                fetching: false,
                error:''
            }
        case types.VENDOR_LIST_FETCH_FAIL:
            return {
                ...state,
                vendorLIst: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
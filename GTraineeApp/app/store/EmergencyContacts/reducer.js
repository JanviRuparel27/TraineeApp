import * as types from './actionTypes'


const initialState = {
    emergencyContacts: {},
};

export default function emergencyContacts(state = initialState, action = {}) {
    switch (action.type) {
        case types.CONTACTS_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.CONTACTS_FETCH_SUCCESS:
            return {
                ...state,
                emergencyContacts: action.payload,
                fetching: false,
                error:''
            }
        case types.CONTACTS_FETCH_FAIL:
            return {
                ...state,
                emergencyContacts: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
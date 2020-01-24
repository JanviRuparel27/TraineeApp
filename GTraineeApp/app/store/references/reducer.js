import * as types from './actionTypes'


const initialState = {
    referencesList: [],
    fetching:false
};

export default function getReferences(state = initialState, action = {}) {
    switch (action.type) {
        case types.REFERENCES_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.REFERENCES_FETCH_SUCCESS:
            return {
                ...state,
                referencesList: action.payload,
                fetching: false,
                error:''
            }
        case types.REFERENCES_FETCH_FAIL:
            return {
                ...state,
                referencesList: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
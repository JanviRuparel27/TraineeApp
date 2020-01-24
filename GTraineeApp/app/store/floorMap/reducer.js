import * as types from './actionTypes'


const initialState = {
    floormapList: {},
};

export default function getFloorMap(state = initialState, action = {}) {
    switch (action.type) {
        case types.FLOORMAP_FETCH_REQUEST:
            return {
            ...state,
            fetching: true,
            error: ''
        }
        case types.FLOORMAP_FETCH_SUCCESS:
            return {
                ...state,
                floormapList: action.payload,
                fetching: false,
                error:''
            }
        case types.FLOORMAP_FETCH_FAIL:
            return {
                ...state,
                floormapList: action.payload,
                fetching: false,
                error: ''
            }
        default:
            return state;
    }
}
import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const getFloorMap = (params, props, headers , {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.FLOORMAP_FETCH_REQUEST})
	   APICall(props,endPoints.FloorMap.endpoint,params, headers,endPoints.FloorMap.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.FLOORMAP_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.FLOORMAP_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};
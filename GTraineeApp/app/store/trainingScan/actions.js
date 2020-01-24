import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const trainingScan = (params, props, headers , {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.TRAINING_SCAN_FETCH_REQUEST})
	   APICall(props,endPoints.TrainingScan.endpoint,params, headers,endPoints.TrainingScan.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.TRAINING_SCAN_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.TRAINING_SCAN_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};
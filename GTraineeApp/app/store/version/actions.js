import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const getVersionValue = (params, props, headers , {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.BUILD_VERSION_FETCH_REQUEST})
	   APICall(props,endPoints.BuildVersionCheck.endpoint,params, headers,endPoints.BuildVersionCheck.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.BUILD_VERSION_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.BUILD_VERSION_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};
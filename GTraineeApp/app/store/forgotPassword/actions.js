import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const forgotPassword = (params, props, headers , {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.FORGOT_PASS_FETCH_REQUEST})
	   APICall(props,endPoints.ForgotPassword.endpoint,params, headers,endPoints.ForgotPassword.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.FORGOT_PASS_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.FORGOT_PASS_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};
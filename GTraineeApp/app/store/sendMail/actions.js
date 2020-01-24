import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const sendMailCall = (params, props, headers , {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.SEND_MAIL_FETCH_REQUEST})
	   APICall(props,endPoints.SendMail.endpoint,params, headers,endPoints.SendMail.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.SEND_MAIL_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.SEND_MAIL_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};
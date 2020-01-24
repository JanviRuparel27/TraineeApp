import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const userGeneralFeedback = (params, props, headers ,{SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.USER_FEEDBACK_FETCH_REQUEST})
	   APICall(props,endPoints.UserGeneralFeedback.endpoint,params, headers,endPoints.UserGeneralFeedback.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.USER_FEEDBACK_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.USER_FEEDBACK_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};